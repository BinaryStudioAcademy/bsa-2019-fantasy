import React, { useState } from 'react';

import { CommentaryList } from './CommentaryList';
import { Field } from './Field';
import { SimulateModal } from './SimulateModal';
import { RescheduleModal } from './RescheduleModal';
import { Sound } from './Sound';

import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export const Play = ({
  gameStarted,
  isSimulation,
  renderStatus,
  events,
  currentEvent,
  fixture,
  requestSimulation,
  stopSimulation,
  playbackControls,
  status,
}) => {
  const { t } = useTranslation();

  const [isMuted, setIsMuted] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isRescheduleOpened, setIsRescheduleOpened] = useState(false);

  const getClassesByStatus = (status) =>
    status ? 'text-red-500 border-red-500' : 'text-gray-300 border-gray-300';

  const renderSimulate = () => {
    if (isSimulation && gameStarted) {
      return (
        <button
          className='border rounded px-2 py-1 mr-2 leading-none	uppercase text-sm text-red-500 border-red-500'
          onClick={() => stopSimulation()}
        >
          { t('LIVE.play.stopSimulation') }
        </button>
      );
    } else {
      return (
        <button
          className='border rounded px-2 py-1 mr-2 leading-none	uppercase text-sm text-green-500 border-green-500'
          onClick={() => setIsModalOpened(true)}
        >
          { t('LIVE.play.simulate') }
        </button>
      );
    }
  };

  const renderReschedule = () => (
    <button
      className='border rounded px-2 py-1 mr-2 leading-none	uppercase text-sm text-green-500 border-green-500'
      onClick={() => setIsRescheduleOpened(true)}
    >
      { t('LIVE.play.reschedule') }
    </button>
  );

  const renderMute = () => {
    const classes = isMuted
      ? 'text-red-500 border-red-500'
      : 'text-green-500 border-green-500';
    /* eslint-disable-next-line */
    const [icon, text] = isMuted ? [<FaVolumeMute />, t('LIVE.play.muted')] : [<FaVolumeUp />, t('LIVE.play.mute')];
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
      <Sound {...{ currentEvent, isMuted }} />
      <div className='flex'>
        <div className='flex flex-1 items-center'>{renderStatus()}</div>
        {fixture}
        <div className='flex flex-1 items-center justify-end'>
          {renderReschedule()}
          {renderSimulate()}
          {renderMute()}
        </div>
      </div>
      <div className='flex'>
        <div className='h-32 w-1/4 flex flex-col'>
          <h5 className='font-bold'>{ t('LIVE.play.commentary') }</h5>
          <CommentaryList events={events} status={status} />
        </div>
        <div className='flex-1 text-center'></div>
        <div className='w-1/4 text-right'>
          <h5 className='font-bold'>{ t('LIVE.play.highlights') }</h5>
          <div className='text-sm'>
            <p>{ t('LIVE.play.yellowCards') }</p>
            <p>{ t('LIVE.play.redCards') }</p>
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

      {isRescheduleOpened && (
        <RescheduleModal onDismiss={() => setIsRescheduleOpened(false)} />
      )}
    </>
  );
};
