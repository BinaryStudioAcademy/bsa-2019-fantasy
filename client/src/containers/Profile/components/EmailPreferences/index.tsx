import React from 'react';

const EmailPreferences = () => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='mb-12 text-5xl font-bold'>Email preferences</h2>
    </form>
  );
};

export default EmailPreferences;
