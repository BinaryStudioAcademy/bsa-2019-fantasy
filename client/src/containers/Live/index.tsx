import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import moment from 'moment';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

import { CommentaryList } from './CommentaryList';
import { Field } from './Field';
import { SimulateModal } from './SimulateModal';

import { loadCurrentGame } from './actions';
import * as faker from './socket';

import { RootState } from 'store/types';

import styles from './styles.module.scss';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const Live = () => {
  // Redux state
  const currentGame = useSelector((state: RootState) => state.currentGame.current);
  const nextGame = useSelector((state: RootState) => state.currentGame.next);
  const clubs = useSelector((state: RootState) => state.clubs.clubs);
  const events = useSelector((state: RootState) => state.currentGame.current.events);
  const getClubById = (id) => {
    return clubs.find((club) => club.id === Number(id));
  };
  const homeClub = getClubById(currentGame.homeClubId);
  const awayClub = getClubById(currentGame.awayClubId);

  // Actions
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCurrentGame());
  }, []);

  // Component state
  const [isMuted, setIsMuted] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const requestSimulation = (homeClubId, awayClubId) => {
    setIsModalOpened(false);
    faker.simulate({ homeClubId, awayClubId });
  };

  // const { homeClubId, awayClubId, score, elapsed = 0 } = this.props.currentGame.current;

  const renderFixture = ({ homeClub, awayClub, centerContent }) => {
    if (!homeClub || !awayClub) return null;
    const renderClub = (club, right = false) => (
      <div className='flex items-center mx-5'>
        <h5 className={`font-bold mx-2 ${right ? 'order-last' : ''}`}>{club.name}</h5>
        <img
          className='w-16'
          src={`images/club-logos/badge_${club.code}_200.png`}
          alt='logo home'
        />
      </div>
    );

    return (
      <div className='flex flex-1'>
        {renderClub(homeClub)}
        <div className='px-3 py-2 text-white font-bold bg-green-900 rounded self-center'>
          {centerContent}
        </div>
        {renderClub(awayClub, true)}
      </div>
    );
  };

  const renderCurrentFixture = () => {
    const score = currentGame.score || [0, 0];
    const centerContent = (
      <div>
        {score[0]}:{score[1]}
      </div>
    );
    return renderFixture({ homeClub, awayClub, centerContent });
  };

  const renderNextFixture = () => {
    if (!nextGame) return 'spinner';
    const homeClub = getClubById(nextGame.hometeam_id);
    const awayClub = getClubById(nextGame.awayteam_id);
    const date = moment(nextGame.start).format('DD.MM');
    const centerContent = <div>{date}</div>;
    return renderFixture({ homeClub, awayClub, centerContent });
  };

  const getClassesByStatus = (status) =>
    status ? 'text-red-500 border-red-500' : 'text-gray-300 border-gray-300';

  const renderStatus = () => {
    const classes = getClassesByStatus(currentGame.gameStarted);
    return (
      <div
        className={`border rounded px-2 py-1 mr-2 leading-none	uppercase text-sm ${classes}`}
      >
        Live
      </div>
    );
  };

  const renderSimulate = () => (
    <button
      className='border rounded px-2 py-1 mr-2 leading-none	uppercase text-sm text-green-500 border-green-500'
      onClick={() => setIsModalOpened(true)}
    >
      Simulate
    </button>
  );

  const renderMute = () => {
    const classes = getClassesByStatus(currentGame.gameStarted);
    /* eslint-disable-next-line */
    const [icon, text] = isMuted ? [<FaVolumeMute />, 'Muted'] : [<FaVolumeUp />, 'Mute'];
    return (
      <button
        className={`flex items-center border rounded px-2 py-1 leading-none	uppercase text-sm ${classes}`}
        onClick={() => setIsMuted(!isMuted)}
      >
        <div className='mr-2'>{text}</div>
        {icon}
      </button>
    );
  };

  const renderProgress = () => {
    const labels = {
      0: 'goal',
      50: 'yellowCard',
      100: 'foul',
    };
    return <Slider min={0} max={100} value={50} labels={labels} />;
  };

  return (
    <>
      <div className='bg-white text-secondary shadow-figma rounded-sm p-12 mb-4'>
        <div className='flex'>
          <div className='flex flex-1 items-center'>
            {renderStatus()}
            {renderSimulate()}
          </div>
          {currentGame.gameStarted ? renderCurrentFixture() : renderNextFixture()}
          <div className='flex flex-1 items-center justify-end'>{renderMute()}</div>
        </div>
        <div className='flex'>
          <div className='h-32 flex-1 max-w-md'>
            <h5 className='font-bold'>Commentary</h5>
            <CommentaryList events={events} />
          </div>
          <div className='flex-1 text-center'>center</div>
          <div>
            <h5 className='font-bold'>Highlights</h5>
            <div className='text-sm'>
              <p>Yellow cards</p>
              <p>Red cards</p>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='w-4/5'>
            <Field events={{}} />
          </div>
        </div>
        <div>{renderProgress()}</div>
      </div>
      <div className='bg-white text-secondary shadow-figma rounded-sm p-12'>
        <div>Replay previous matches</div>
      </div>
      {isModalOpened && (
        <SimulateModal
          clubs={clubs}
          onSubmit={requestSimulation}
          onDismiss={() => setIsModalOpened(false)}
        />
      )}
    </>
  );
};

export default Live;
