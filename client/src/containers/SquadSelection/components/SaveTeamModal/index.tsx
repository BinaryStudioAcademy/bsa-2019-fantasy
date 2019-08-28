import React from 'react';
import { useTranslation } from 'react-i18next';

import Modal from 'components/Modal';
import Button from 'components/Button';

type Props = {
  onDismiss: () => void;
  onSubmit: (e: React.SyntheticEvent) => void;
};

const SaveTeamModal = ({ onDismiss, onSubmit }: Props) => {
  const { t } = useTranslation();
  return (
    <Modal className='justify-between' onClose={onDismiss} showCondition>
      <form
        style={{ display: 'contents' }}
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmit}
        role='presentation'
      >
        <h2 className='text-5xl text-secondary'>{t('Gameweek.saveTeam')}</h2>
        <label className='flex flex-col'>
          <span>{t('SaveTeamModal.title')}:</span>
          <input
            className='border-2 p-2 border-gray-400 focus:border-blue-500 rounded'
            type='text'
            placeholder={t('SaveTeamModal.placeholder')}
          />
        </label>
        <Button className='mt-3'>
          <p>{t('SaveTeamModal.btn')}</p>
        </Button>
      </form>
    </Modal>
  );
};

export default SaveTeamModal;
