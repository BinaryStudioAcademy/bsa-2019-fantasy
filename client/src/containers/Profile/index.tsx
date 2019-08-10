import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/types';
import { withTranslation } from 'react-i18next';

const Profile = ({t}:{t:any}) => {
  const user = useSelector((state: RootState) => state.profile.user);

  return (
    <div className='h-64 bg-white shadow rounded-sm p-12'>
      Current user name is: ${user ? user.username : 'NULLER'};
    </div>
  );
};

export default withTranslation()(Profile);
