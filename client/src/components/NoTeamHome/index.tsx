import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import styles from './styles.module.scss';

const NoTeamHome = () => {
  const { t } = useTranslation();

  return (
    <section className='flex bg-white rounded-sm text-secondary'>
      <div className='flex items-center mr-4 p-10 no-home-bg'>
        <div className='flex'>
          <Player
            src='images/uniforms/field-players/shirt_36-66.png'
            name='Duffy'
            club='WAT (A)'
          />
          <Player
            src='images/uniforms/field-players/shirt_14-66.png'
            name='Mane'
            club='NOR (H)'
          />
          <Player
            src='images/uniforms/field-players/shirt_20-66.png'
            name='Redmond'
            club='BUR (A)'
          />
        </div>
        <div className='self-start' style={{ minWidth: '196px' }}>
          <h4 className='text-xl font-semibold'>{t('NoTeamHome.leftTitle')}</h4>
          <p>{t('NoTeamHome.leftMain')}</p>
        </div>
      </div>
      <div className='flex items-center'>
        <div>
          <img
            style={{ maxWidth: 'none' }}
            src='https://fantasy.premierleague.com/static/media/home-step-2@1x.ae9ca8c2.png'
            alt='leagues'
          />
        </div>
        <div className='pl-4 pr-4 mb-12' style={{ minWidth: '196px', maxHeight: '96px' }}>
          <h4 className='text-xl font-semibold'>{t('NoTeamHome.rightTitle')}</h4>
          <p>{t('NoTeamHome.rightMain')}</p>
        </div>
      </div>
    </section>
  );
};

interface PlayerProps {
  src: string;
  name: string;
  club: string;
}

const Player = ({ src, name, club }: PlayerProps) => {
  return (
    <div className='text-center pr-4'>
      <img src={src} className={cn(styles.playerImg, styles.playerShadow)} alt='player' />
      <div>
        <div className={styles.playerName}>{name}</div>
        <div className={styles.playerClub}>{club}</div>
      </div>
    </div>
  );
};

export default NoTeamHome;
