import React from 'react';
import { useTranslation } from 'react-i18next';

import { GameweekHistoryType } from 'types/gameweekHistory.type';

import styles from './styles.module.scss';

type Props = {
  isCaptain: boolean;
  isViceCaptain: boolean;
  onClose: () => void;
  onSetCaptain: () => void;
  onSetViceCaptain: () => void;
  name: string;
  funcForSwitching: () => void;
  toSwitch: boolean;
};

const StatusPlayerModal = ({
  isCaptain,
  isViceCaptain,
  onClose,
  onSetCaptain,
  onSetViceCaptain,
  name,
  funcForSwitching,
  toSwitch,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div
      className='dimmer flex absolute inset-0 bg-modalDimmer'
      tabIndex={-1}
      role='presentation'
    >
      <div
        className='modal-status m-auto max-w-full max-h-full bg-white w-1/3 text-white'
        role='presentation'
      >
        <div
          className={`${styles['modal-header']} bg-green-700 p-4 font-bold text-xl flex justify-between`}
        >
          <h3>{name}</h3>
          <button onClick={() => onClose()}>
            <span className={styles.close} />
          </button>
        </div>
        <div className='modal-body p-6 flex flex-col'>
          <button
            className='bg-green-700 p-2 mb-4 rounded'
            onClick={() => {
              funcForSwitching && funcForSwitching();
            }}
          >
            {toSwitch ? t('StatusPlayerModal.switch') : t('StatusPlayerModal.cancel')}
          </button>
          {!isCaptain && (
            <button
              className='bg-green-700 p-2 mb-4 rounded'
              onClick={() => onSetCaptain()}
            >
              {t('StatusPlayerModal.makeCaptain')}
            </button>
          )}
          {!isViceCaptain && (
            <button
              className='bg-green-700 p-2 rounded'
              onClick={() => onSetViceCaptain()}
            >
              {t('StatusPlayerModal.makeViceCaptain')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusPlayerModal;
