import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { PitchPlayerType } from 'components/Pitch/types';

import Modal from 'components/Modal';

import styles from './styles.module.scss';

type Props = {
  player: {
    canBeSwitched: boolean;
    inSwitcheroo: boolean;
    item: PitchPlayerType;
  };

  onClose: () => void;
  onSetCaptain: () => void;
  onSetViceCaptain: () => void;
  onSwitch: () => void;
  onCancel: () => void;
};

const StatusPlayerModal = ({
  player: { item: player, canBeSwitched, inSwitcheroo },
  onClose,
  onSetCaptain,
  onSetViceCaptain,
  onSwitch,
  onCancel,
}: Props) => {
  const { t } = useTranslation();

  if (!player.item) {
    return null;
  }

  return (
    <Modal onClose={onClose} className={cn('p-0 min-h-0', 'text-white', styles.modal)}>
      <div
        className={cn(
          styles['modal-header'],
          'bg-green-700',
          'p-4',
          'font-bold',
          'text-3xl',
          'flex',
          'justify-between',
          'rounded',
        )}
      >
        <h3 className='w-full truncate'>
          <span className='text-green-300'>[{player.item.player_stats.position}]</span>{' '}
          <span>{player.item.player_stats.second_name}</span>
        </h3>
      </div>
      <div className='flex-grow p-6 flex flex-col justify-center'>
        {canBeSwitched && (
          <button
            className='bg-green-700 p-2 rounded font-bold'
            onClick={() => {
              inSwitcheroo ? onCancel() : onSwitch();
            }}
          >
            {inSwitcheroo ? t('StatusPlayerModal.cancel') : t('StatusPlayerModal.switch')}
          </button>
        )}
        {!player.item.is_on_bench && (
          <>
            {!player.item.is_captain && (
              <button
                className='bg-green-700 p-2 rounded font-bold'
                onClick={() => onSetCaptain()}
              >
                {t('StatusPlayerModal.makeCaptain')}
              </button>
            )}
            {!player.item.is_vice_captain && (
              <button
                className='bg-green-700 p-2 rounded font-bold'
                onClick={() => onSetViceCaptain()}
              >
                {t('StatusPlayerModal.makeViceCaptain')}
              </button>
            )}
          </>
        )}
        {!canBeSwitched && player.item.is_on_bench && (
          <div className='text-gray-500 text-center'>No actions available</div>
        )}
      </div>
    </Modal>
  );
};

export default StatusPlayerModal;
