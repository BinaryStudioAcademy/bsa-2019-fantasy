import React from 'react';
import { withTranslation } from 'react-i18next';

const NotFound = ({t}:{t:any}) => (
    <span>{t(`NotFound.message`)}</span>
);

export default withTranslation()(NotFound);
