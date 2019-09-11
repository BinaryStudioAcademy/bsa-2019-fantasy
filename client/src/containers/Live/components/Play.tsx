import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CommentaryList } from './CommentaryList';
import { SimulateModal } from './SimulateModal';
import { RescheduleModal } from './RescheduleModal';
import { Sound } from './Sound';

import eventList from '../helpers/highlightedEvents';

import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import moment from 'moment';

export const Play = ({
  gameStarted,
  isSimulation,
  renderStatus,
  events,
  currentEvent,
  fixture,
  requestSimulation,
  stopSimulation,
  status,
}) => {
  const { t } = useTranslation();

  const [isMuted, setIsMuted] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isRescheduleOpened, setIsRescheduleOpened] = useState(false);

  const renderSimulate = () => {
    if (isSimulation && gameStarted) {
      return (
        <button
          className='border rounded px-2 py-1 mr-2 leading-none	uppercase text-sm text-red-500 border-red-500'
          onClick={() => stopSimulation()}
        >
          {t('LIVE.play.stopSimulation')}
        </button>
      );
    } else {
      return (
        <button
          className='border rounded px-2 py-1 mr-2 leading-none	uppercase text-sm text-green-500 border-green-500'
          onClick={() => setIsModalOpened(true)}
        >
          {t('LIVE.play.simulate')}
        </button>
      );
    }
  };

  const renderReschedule = () => (
    <button
      className='border rounded px-2 py-1 mr-2 leading-none	uppercase text-sm text-green-500 border-green-500'
      onClick={() => setIsRescheduleOpened(true)}
    >
      {t('LIVE.play.reschedule')}
    </button>
  );

  const renderMute = () => {
    const classes = isMuted
      ? 'text-red-500 border-red-500'
      : 'text-green-500 border-green-500';
    /* eslint-disable react/jsx-key */
    const [icon, text] = isMuted
      ? [<FaVolumeMute />, t('LIVE.play.muted')]
      : [<FaVolumeUp />, t('LIVE.play.mute')];
    /* eslint-enable react/jsx-key */
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

  const renderHighlights = () => {
    const elements = events.reduce((acc, event, index) => {
      const eventProps = eventList[event.name];
      if (eventProps) {
        const elapsed = Math.round(moment.duration(event.elapsed).asMinutes());
        const element = (
          <div className='flex items-center' key={index}>
            <img
              className='h-4 w-4 object-contain mr-2'
              src={eventProps.icon}
              alt={event.name}
            />
            <p>{`${elapsed}′ - ${event.player.second_name}`}</p>
          </div>
        );
        return [...acc, element];
      } else {
        return acc;
      }
    }, []);
    return elements;
  };

  return (
    <>
      <div className='flex'>
        <div className='flex flex-1 items-center'>{renderStatus()}</div>
        {fixture}
        <div className='flex flex-1 items-center justify-end'>
          {renderReschedule()}
          {renderSimulate()}
          {renderMute()}
        </div>
      </div>
      <div className='flex relative z-10 h-32'>
        <div className='w-1/4 flex flex-col'>
          <h5 className='font-bold'>{t('LIVE.play.commentary')}</h5>
          <CommentaryList events={events} status={status} />
        </div>
        <div className='flex-1 text-center'></div>
        <div className='w-1/4 text-right'>
          <h5 className='font-bold'>{t('LIVE.play.highlights')}</h5>
          <div className='text-sm flex flex-col items-end'>{renderHighlights()}</div>
        </div>
      </div>
      <Sound {...{ currentEvent, isMuted }} />
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
