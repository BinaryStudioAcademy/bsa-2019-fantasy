import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactDom from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import cn from 'classnames';

import styles from './styles.module.scss';

const PrivateLeagueModal = ({ open, onClose, code }) => {
  const { t } = useTranslation();

  const [copied, setCopy] = useState(false);

  const copyToClipboard = (e) => {
    e.target.select();
    document.execCommand('copy');
    e.target.focus();
    setCopy(true);
  };

  const closeModal = () => {
    setCopy(false);
    onClose();
  };

  if (open) {
    return ReactDom.createPortal(
      <div className={styles['modal-cover']}>
        <div className={cn(styles.modal, 'rounded')}>
          <button className={styles['modal-close']} onClick={closeModal}>
            <FaTimes />
          </button>
          <div className={styles['modal-body']}>
            <div className='modal-header'>
              <h2 className='text-4xl font-bold'>{t('PrivateLeagueModal.title')}</h2>
            </div>
            <p className='text-lg text-gray-600 text-xs italic mb-5'>
              {t('PrivateLeagueModal.message')}
            </p>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full md:w-1/2 px-3'>
                <label
                  className='block uppercase text-gray-700 text-xs font-bold mb-2'
                  htmlFor='league-code'
                >
                  {t('PrivateLeagueModal.invitationCode')}
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='league-code'
                  type='text'
                  name='code'
                  onClick={(e) => copyToClipboard(e)}
                  readOnly
                  value={code}
                />
              </div>
            </div>
            {copied ? (
              <p className='text-green-500 italic mb-5'>
                {t('PrivateLeagueModal.copied')}
              </p>
            ) : (
              <p className='text-gray-600 italic mb-5'>
                {t('PrivateLeagueModal.clickToCopy')}
              </p>
            )}
          </div>
        </div>
      </div>,
      document.querySelector('#modal') as Element,
    );
  } else {
    return <div />;
  }
};

export default PrivateLeagueModal;
