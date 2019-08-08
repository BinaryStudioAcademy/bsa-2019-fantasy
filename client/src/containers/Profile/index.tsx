import React from 'react';
import { useSelector } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { RootState } from 'store/types';

const Profile = ({t}:{t:any}) => {
    const user = useSelector((state: RootState) => state.profile.user);

    return <div>{t('Profile.current-user')}{user ? user.username : 'NULLER'}</div>;
};

export default withTranslation()(Profile);
