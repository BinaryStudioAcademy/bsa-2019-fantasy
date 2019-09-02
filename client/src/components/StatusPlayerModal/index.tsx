import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { DisplayPlayerType } from 'components/Pitch/types';

import Modal from 'components/Modal';

import styles from './styles.module.scss';

type Props = {
  player: DisplayPlayerType;

  onClose: () => void;
  onSetCaptain: () => void;
  onSetViceCaptain: () => void;
  funcForSwitching: () => void;
  toSwitch: boolean;
};

const StatusPlayerModal = ({
  player,
  onClose,
  onSetCaptain,
  onSetViceCaptain,
  funcForSwitching,
  toSwitch,
}: Props) => {
  const { t } = useTranslation();

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
        <h3>{`${player.player_stats.first_name} ${player.player_stats.second_name}`}</h3>
      </div>
      <div className='flex-grow p-6 flex flex-col justify-center'>
        <button
          className='bg-green-700 p-2 rounded font-bold'
          onClick={() => {
            funcForSwitching && funcForSwitching();
          }}
        >
          {toSwitch ? t('StatusPlayerModal.switch') : t('StatusPlayerModal.cancel')}
        </button>
        {!player.is_on_bench && (
          <>
            {!player.is_captain && (
              <button
                className='bg-green-700 p-2 rounded font-bold'
                onClick={() => onSetCaptain()}
              >
                {t('StatusPlayerModal.makeCaptain')}
              </button>
            )}
            {!player.is_vice_captain && (
              <button
                className='bg-green-700 p-2 rounded font-bold'
                onClick={() => onSetViceCaptain()}
              >
                {t('StatusPlayerModal.makeViceCaptain')}
              </button>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default StatusPlayerModal;
