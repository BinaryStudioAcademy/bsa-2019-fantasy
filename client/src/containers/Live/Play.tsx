import React, { useState } from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import moment from 'moment';
import { CommentaryList } from './CommentaryList';
import { Field } from './Field';
import { SimulateModal } from './SimulateModal';

export const Play = ({
  gameStarted,
  events,
  currentEvent,
  fixture,
  requestSimulation,
  playbackControls,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const getClassesByStatus = (status) =>
    status ? 'text-red-500 border-red-500' : 'text-gray-300 border-gray-300';

  const renderStatus = () => {
    const classes = getClassesByStatus(gameStarted);
    return (
      <div
        className={`border rounded px-2 py-1 mr-2 leading-none	uppercase text-sm ${classes}`}
      >
        Live
      </div>
    );
  };
  const renderUpcoming = () =>
    gameStarted || (
      <div
        className={`border rounded px-2 py-1 mr-2 leading-none	uppercase text-sm text-green-500 border-green-500`}
      >
        Upcoming
      </div>
    );

  const renderSimulate = () => (
    <button
      className='border rounded px-2 py-1 mr-2 leading-none	uppercase text-sm text-green-500 border-green-500'
      onClick={() => setIsModalOpened(true)}
    >
      Simulate
    </button>
  );

  const renderMute = () => {
    const classes = getClassesByStatus(gameStarted);
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

  return (
    <>
      <div className='flex'>
        <div className='flex flex-1 items-center'>
          {renderStatus()}
          {renderUpcoming()}
          {playbackControls}
        </div>
        {fixture}
        <div className='flex flex-1 items-center justify-end'>
          {renderSimulate()}
          {renderMute()}
        </div>
      </div>
      <div className='flex'>
        <div className='h-32 w-1/4 flex flex-col'>
          <h5 className='font-bold'>Commentary</h5>
          <CommentaryList events={events} />
        </div>
        <div className='flex-1 text-center'>center</div>
        <div className='w-1/4 text-right'>
          <h5 className='font-bold'>Highlights</h5>
          <div className='text-sm'>
            <p>Yellow cards</p>
            <p>Red cards</p>
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='w-4/5'>
          <Field currentEvent={currentEvent} />
        </div>
      </div>

      {isModalOpened && (
        <SimulateModal
          onSubmit={(...props) => {
            setIsModalOpened(false);
            requestSimulation(...props);
          }}
          onDismiss={() => setIsModalOpened(false)}
        />
      )}
    </>
  );
};
