import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import moment from 'moment';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

import { Play } from './Play';
import { Fixture } from './Fixture';
import { LastGamesList } from './LastGamesList';

import { loadCurrentGame, loadLastGames } from './actions';
import * as faker from './socket';
import * as eventsService from 'services/eventsService';

import { RootState } from 'store/types';

import styles from './styles.module.scss';
import './progress.style.scss'; // cannot style nested elements of uncontrolled component react-rangeslider with css modules
import produce from 'immer';

const Live = () => {
  // Redux state
  const currentGame = useSelector((state: RootState) => state.currentGame.current);
  const nextGame = useSelector((state: RootState) => state.currentGame.next);
  const lastGames = useSelector((state: RootState) => state.currentGame.lastGames);

  const clubs = useSelector((state: RootState) => state.clubs.clubs);
  const currentEvents = useSelector(
    (state: RootState) => state.currentGame.current.events,
  );
  const getClubById = (id) => {
    return clubs.find((club) => club.id === Number(id));
  };

  // Component state
  const [currentEvent, setCurrentEvent] = useState();
  const [replayGame, setReplayGame] = useState();
  const [replayEvents, setReplayEvents] = useState();

  console.log(replayGame);

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
  const elapsed = replayGame ? 0 : currentElapsed;
  const events = replayGame ? replayGame.events : currentGame.events;

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
      setReplayEvents(events);
    };
    if (replayGame) {
      // eslint-disable-next-line
      getEvents(replayGame.id);
    }
  }, [replayGame]);

  useEffect(() => setCurrentEvent(events[events.length - 1]), [events]);

  const requestSimulation = (homeClubId, awayClubId) => {
    faker.simulate({ homeClubId, awayClubId });
  };

  const renderCurrentFixture = () => {
    const centerContent = (
      <div>
        {score[0]}:{score[1]}
      </div>
    );
    const elapsedSeconds = moment.duration(elapsed).asSeconds();
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = Math.round(elapsedSeconds - minutes * 60);
    const format = (number) => {
      const numStr = String(number);
      const prefixZeroCount = 2 - numStr.length;
      return prefixZeroCount <= 0
        ? numStr
        : Array(prefixZeroCount + 1).join('0') + numStr;
    };
    const belowContent = `${format(minutes)}:${format(seconds)}`;
    return <Fixture {...{ homeClub, awayClub, centerContent, belowContent }} />;
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

  const renderProgress = () => {
    const labels = events
      .filter((event) => event.name === 'goal')
      .reduce(
        (acc, { elapsed, player }) =>
          Object.assign(acc, {
            [elapsed]: `${Math.round(moment.duration(elapsed).asMinutes())}' ${
              player.second_name
            }`,
          }),
        {},
      );
    const value = currentEvent ? currentEvent.elapsed : 0;
    return (
      <Slider
        className='progress'
        min={0}
        max={90 * 60 * 1000}
        value={value}
        labels={labels}
      />
    );
  };

  const onPlayClick = () => {
    console.log('play');
    setReplayGame(
      produce((draft) => {
        draft.isPlaying = true;
      }),
    );
  };

  const onPauseClick = () => {
    console.log('pause');
  };

  const renderPlaybackControls = () => {
    if (!replayGame) return null;
    const classes =
      'border rounded px-2 py-1 mr-2 leading-none	uppercase text-sm text-green-500 border-green-500';
    return (
      <>
        <button className={classes} onClick={onPlayClick}>
          Play
        </button>
        <button className={classes} onClick={onPauseClick}>
          Pause
        </button>
      </>
    );
  };

  const onFixtureClick = (game) => () => {
    setReplayGame({
      ...game,
      hometeam_score: 0,
      awayteam_score: 0,
      isPlaying: false,
      events: [],
      currentEvent: undefined,
    });
  };

  return (
    <>
      <div className='bg-white text-secondary shadow-figma rounded-sm p-12 mb-4'>
        <Play
          gameStarted={currentGame.gameStarted}
          events={events}
          currentEvent={currentEvent}
          fixture={fixture}
          requestSimulation={requestSimulation}
          playbackControls={renderPlaybackControls()}
        />
        <div className='mt-12'>{renderProgress()}</div>
      </div>
      <div className='bg-white text-secondary shadow-figma rounded-sm p-12'>
        <h3 className='font-bold text-3xl mb-4'>Replay previous matches</h3>
        <LastGamesList
          games={lastGames}
          getClubById={getClubById}
          onClick={onFixtureClick}
        />
      </div>
    </>
  );
};

export default Live;
