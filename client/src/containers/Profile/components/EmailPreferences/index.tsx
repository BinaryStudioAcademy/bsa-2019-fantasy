import React from 'react';
import { useTranslation } from 'react-i18next';

const EmailPreferences = () => {
  const { t } = useTranslation();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='mb-12 text-5xl font-bold'>{t('Profile.emailPreferences.title')}</h2>
    </form>
  );
};

export default EmailPreferences;
