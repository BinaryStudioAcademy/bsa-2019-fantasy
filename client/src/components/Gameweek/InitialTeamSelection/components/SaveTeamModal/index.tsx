import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button';

type Props = {
  onDismiss?: (e: React.SyntheticEvent) => void;
  onSubmit: (e: React.SyntheticEvent) => void;
};

const SaveTeamModal = ({ onDismiss, onSubmit }: Props) => {
  const { t } = useTranslation();
  return (
    <div className='font-sans'>
      <div
        className='dimmer flex absolute inset-0 z-10 bg-modalDimmer'
        onClick={onDismiss}
        tabIndex={-1}
        role='presentation'
      >
        <form
          className='flex flex-col modal m-auto max-w-full max-h-full p-12 bg-white rounded-sm'
          onClick={(e) => e.stopPropagation()}
          onSubmit={(ev) => onSubmit(ev)}
          role='presentation'
        >
          <div className='header'>
            <h3 className='text-2xl font-semibold mb-4'>{t('SaveTeamModal.title')}</h3>
          </div>
          <input
            className='border-2 p-2 border-gray-400 focus:border-blue-500'
            type='text'
            placeholder={t('SaveTeamModal.placeholder')}
          />
          <Button className='mt-3'>
            <p>{t('SaveTeamModal.btn')}</p>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SaveTeamModal;
