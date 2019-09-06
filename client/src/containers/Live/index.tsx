import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import produce from 'immer';
import moment from 'moment';
import 'react-rangeslider/lib/index.css';
import Slider from 'react-rangeslider';
import cn from 'classnames';

import { Play } from './components/Play';
import { Fixture } from './components/Fixture';
import { LastGamesList } from './components/LastGamesList';
import { EventBar } from './components/EventBar';

import { loadCurrentGame, loadLastGames } from './actions';
import { createIterator } from './helpers/iterator';
import * as faker from './helpers/socket';
import * as eventsService from 'services/eventsService';
import { useInterval } from 'helpers/hooks/interval.hook';

import { RootState } from 'store/types';

// cannot style nested elements of uncontrolled component react-rangeslider with css modules
import './progress.style.scss';
import { FaRegPlayCircle, FaRegPauseCircle, FaLongArrowAltLeft } from 'react-icons/fa';

import { useTranslation } from 'react-i18next';

const prepareEvent = (event, homeClubId) => {
  // format event object
  const player = event.player && event.player.player;
  const team = player && player.club_id === homeClubId ? 'home' : 'away';
  return { ...event, name: event.event_type, elapsed: event.time, team, player };
};

const formatElapsed = (elapsed) => {
  let elapsedSeconds = moment.duration(elapsed).asSeconds();
  if (elapsedSeconds > 90 * 60) elapsedSeconds = 90 * 60;
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = Math.round(elapsedSeconds - minutes * 60);
  const format = (number) => {
    const numStr = String(number);
    const prefixZeroCount = 2 - numStr.length;
    return prefixZeroCount <= 0 ? numStr : Array(prefixZeroCount + 1).join('0') + numStr;
  };
  return `${format(minutes)}:${format(seconds)}`;
};

const Live = () => {
  const { t } = useTranslation();

  //Set a title
  useEffect(() => {
    document.title = 'LIVE | Fantasy Football League';
  }, []);

  // Redux state
  const currentGame = useSelector((state: RootState) => state.currentGame.current);
  const nextGame = useSelector((state: RootState) => state.currentGame.next);
  const lastGames = useSelector((state: RootState) => state.currentGame.lastGames);
  const clubs = useSelector((state: RootState) => state.clubs.clubs);

  const getClubById = (id) => {
    return clubs.find((club) => club.id === Number(id));
  };

  // Component state
  const [currentEvent, setCurrentEvent] = useState();
  const [replayGame, setReplayGame] = useState();
  const [replayEvents, setReplayEvents] = useState();
  const [progress, setProgress] = useState(0);

  // Replay game dependent variables
  const homeClub = getClubById(
    replayGame ? replayGame.hometeam_id : currentGame.homeClubId,
  );
  const awayClub = getClubById(
    replayGame ? replayGame.awayteam_id : currentGame.awayClubId,
  );

  const currentScore = currentGame.score || [0, 0];
  const replayScore = replayGame
    ? [replayGame.hometeam_score, replayGame.awayteam_score]
    : [0, 0];
  const score = replayGame ? replayScore : currentScore;

  const currentElapsed = currentGame.elapsed || 0;
  const elapsed = replayGame ? replayGame.elapsed : currentElapsed;
  const events = replayGame ? replayGame.events : currentGame.events;
  //console.log(events);

  // Actions
  const dispatch = useDispatch();

  // Initial load
  useEffect(() => {
    dispatch(loadCurrentGame());
    dispatch(loadLastGames(9));
  }, []);

  // Load replay game events
  useEffect(() => {
    const getEvents = async (id) => {
      const events = await eventsService.getEventsByGameId(id);
      setReplayEvents(createIterator(events));
    };
    if (replayGame) {
      // eslint-disable-next-line
      getEvents(replayGame.id);
    }
  }, [replayGame && replayGame.id]);

  const requestSimulation = (homeClubId, awayClubId) => {
    setReplayGame(undefined);
    faker.simulate({ homeClubId, awayClubId });
  };

  const stopSimulation = () => {
    faker.stopSimulation();
  };

  // On every new added event
  useEffect(() => {
    const event = events[events.length - 1];
    setCurrentEvent(event);
    event && setProgress(event.elapsed);
  }, [events]);

  // Replay playback interval
  useInterval(
    () => {
      if (!replayGame.isPlaying) return;
      const event = replayEvents.next().value;

      if (event) {
        const status = { homeClub, awayClub, score };
        const preparedEvent = prepareEvent(event, homeClub && homeClub.id);
        setReplayGame(
          produce((draft) => {
            draft.events.push(preparedEvent);
            draft.elapsed = preparedEvent.elapsed;
            // Event handlers
            if (preparedEvent.name === 'goal') {
              preparedEvent.team === 'home'
                ? draft.hometeam_score++
                : draft.awayteam_score++;
            }
          }),
        );
      } else {
        // last event reached, stop replay
        setReplayGame(
          produce((draft) => {
            draft.isPlaying = false;
          }),
        );
      }
    },
    replayGame && replayGame.isPlaying ? 1000 : null,
  );

  const onPlayClick = () => {
    setReplayGame(
      produce((draft) => {
        draft.isPlaying = true;
      }),
    );
  };

  const onPauseClick = () => {
    setReplayGame(
      produce((draft) => {
        draft.isPlaying = false;
        draft.events.push({ name: 'stop' });
      }),
    );
  };

  const renderPlaybackControls = () => {
    if (!replayGame) return null;
    const classes = 'text-4xl text-secondary';
    return replayGame.isPlaying ? (
      <button className={classes} onClick={onPauseClick}>
        <FaRegPauseCircle />
      </button>
    ) : (
      <button className={classes} onClick={onPlayClick}>
        <FaRegPlayCircle />
      </button>
    );
  };

  const renderCurrentFixture = () => {
    const centerContent = (
      <div>
        {score[0]}:{score[1]}
      </div>
    );
    const belowContent = formatElapsed(elapsed);
    const belowBelowContent = renderPlaybackControls();
    return (
      <Fixture
        {...{ homeClub, awayClub, centerContent, belowContent, belowBelowContent }}
      />
    );
  };

  const renderNextFixture = () => {
    if (!nextGame) return 'spinner';
    const homeClub = getClubById(nextGame.hometeam_id);
    const awayClub = getClubById(nextGame.awayteam_id);
    const centerContent = moment(nextGame.start).format('DD.MM');
    const belowContent = moment(nextGame.start).format('HH:mm');
    return <Fixture {...{ homeClub, awayClub, centerContent, belowContent }} />;
  };

  const fixture =
    replayGame || currentGame.gameStarted ? renderCurrentFixture() : renderNextFixture();

  const handleProgressChangeStart = () => {
    if (!replayGame) return false;
    setReplayGame(
      produce((draft) => {
        draft.isPlaying = false;
      }),
    );
  };

  const handleProgressChangeComplete = () => {
    const value = progress;
    if (!replayGame) return false;
    const events = replayEvents.getItems();
    const closest = events.reduce(function(prev, curr) {
      return Math.abs(curr.time - value) < Math.abs(prev.time - value) ? curr : prev;
    });
    const index = events.indexOf(closest);
    replayEvents.setIndex(index);
    const passedEvents = events
      .slice(0, index)
      .map((event) => prepareEvent(event, homeClub && homeClub.id));

    setReplayGame(
      produce((draft) => {
        draft.hometeam_score = passedEvents.filter(
          (event) => event.name === 'goal' && event.team === 'home',
        ).length;
        draft.awayteam_score = passedEvents.filter(
          (event) => event.name === 'goal' && event.team === 'away',
        ).length;
        draft.events = passedEvents;
        draft.isPlaying = true;
      }),
    );
  };

  const renderProgress = (events) => {
    const homeEvents = events.filter(({ team }) => team === 'home');
    const awayEvents = events.filter(({ team }) => team === 'away');

    return (
      <div>
        <EventBar events={homeEvents} position='top' />
        <Slider
          className='progress'
          min={0}
          step={90 * 1000}
          max={90 * 60 * 1000}
          value={progress}
          format={formatElapsed}
          onChangeStart={handleProgressChangeStart}
          onChange={(value) => {
            if (!replayGame) return false;
            setProgress(value);
          }}
          onChangeComplete={handleProgressChangeComplete}
        />
        <EventBar events={awayEvents} position='bottom' />
      </div>
    );
  };

  const onFixtureClick = (game) => () => {
    if (!replayGame || replayGame.id !== game.id) {
      console.log('set replay game');
      setReplayGame({
        ...game,
        hometeam_score: 0,
        awayteam_score: 0,
        isPlaying: false,
        events: [{ name: 'stop' }], // event to stop all sounds
        currentEvent: undefined,
      });

      // progress element
      setProgress(0);

      // rewind event iterator to start
      replayEvents && replayEvents.setIndex(0);
    }

    // scrollTop
    const scrollElement = document.querySelector('#root>.flex>.flex-1');
    scrollElement && scrollElement.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderStatus = () => {
    const gameStarted = currentGame.gameStarted;
    const color = gameStarted
      ? 'text-red-500 border-red-500'
      : 'text-green-500 border-green-500';

    const text = gameStarted ? t('LIVE.live') : t('LIVE.upcoming');
    const content = replayGame ? (
      <>
        <FaLongArrowAltLeft />
        <span className='ml-1'>
          {t('LIVE.returnTo')} {text}
        </span>
      </>
    ) : (
      text
    );

    return (
      <button
        className={`flex border rounded px-2 py-1 mr-2 leading-none	uppercase text-sm ${color}`}
        onClick={() => setReplayGame(null)}
      >
        {content}
      </button>
    );
  };

  return (
    <>
      <div className='bg-white text-secondary shadow-figma rounded-sm p-12 mb-4'>
        <Play
          gameStarted={currentGame.gameStarted}
          isSimulation={currentGame.isSimulation}
          renderStatus={renderStatus}
          events={events}
          currentEvent={currentEvent}
          fixture={fixture}
          requestSimulation={requestSimulation}
          stopSimulation={stopSimulation}
          status={{ homeClub, awayClub, score }}
        />
        <div className='mt-12'>{renderProgress(events)}</div>
      </div>
      <div className='bg-white text-secondary shadow-figma rounded-sm p-12'>
        <h3 className='font-bold text-3xl mb-4'>{t('LIVE.replayPreviousMatches')}</h3>
        <LastGamesList
          games={lastGames}
          getClubById={getClubById}
          onClick={onFixtureClick}
          value={replayGame && replayGame.id}
        />
      </div>
    </>
  );
};

export default Live;
