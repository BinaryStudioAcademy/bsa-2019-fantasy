import React from 'react';

import './styles.scss';

type Props = {
  isCaptain: boolean;
  isViceCaptain: boolean,
  onClose: () => void,
  onSetCaptain: () => void,
  onSetViceCaptain: () => void,
  name: string
}

const StatusPlayerModal = ({
  isCaptain,
  isViceCaptain,
  onClose,
  onSetCaptain,
  onSetViceCaptain,
  name
}: Props) => {
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
        <div className='modal-header bg-green-700 p-4 font-bold text-xl flex justify-between'>
          <h3>{name}</h3>
          <button onClick={() => onClose()}>
            <span className='close'></span>
          </button>
        </div>
        <div className='modal-body p-6 flex flex-col'>
          {!isCaptain && (
            <button
              className='bg-green-700 p-2 mb-4 rounded'
              onClick={() => onSetCaptain()}
            >
              Make Captain
            </button>
          )}
          {!isViceCaptain && (
            <button
              className='bg-green-700 p-2 rounded'
              onClick={() => onSetViceCaptain()}
            >
              Make Vice-Captain
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusPlayerModal;
