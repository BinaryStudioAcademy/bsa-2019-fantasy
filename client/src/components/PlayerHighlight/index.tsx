import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';

import Button from 'components/Button';

//import './styles.scss';
import sampleChart from 'assets/images/chart.svg';

const PlayerHighlight = () => (
  <section className='playerHighlight flex bg-white shadow rounded-sm p-8  text-secondary'>
    <div className='playerInfo flex flex-col flex-shrink-0 items-start p-4'>
      <div className='clubLogo rounded-full shadow p-4'>
        <img className='w-16' src='/images/club-logos/badge_4_80.png' alt='Club logo' />
      </div>

      <div className='award text-secondary2 mt-12'>
        <FontAwesomeIcon icon={faMedal} /> Player of the week
      </div>

      <h2 className='playerName font-bold text-3xl xl:text-5xl mt-4 leading-none'>
        Lucas Digne
      </h2>
      <h3 className='clubName text-secondary2 text-3xl xl:text-5xl'>Liverpool</h3>

      <div className='actions mt-10 xl:mt-16'>
        <Button
          href='/history'
          type='link'
          styling='primary'
          className='text-sm xl:text-base mr-4'
        >
          History
        </Button>
        <Button
          href='/fixtures'
          type='link'
          styling='secondary'
          className='text-sm xl:text-base'
        >
          Fixtures
        </Button>
      </div>

      <div className='allWinners mt-6 text-sm'>
        <Link className='font-semibold hover:underline' to='/'>
          Browse all winners
        </Link>
      </div>
    </div>

    <div className='playerPhoto flex items-end px-0 xl:px-8 pt-4 -mb-8'>
      <img
        style={{ maxHeight: '28em' }}
        src='/images/players/500x500/101188.png'
        alt='playerPhoto'
      />
    </div>

    <div
      className='statsChart flex flex-wrap content-center p-0 xl:p-4 xl:border-l border-greyBorder'
      style={{ flexShrink: 2 }}
    >
      <div className='flex flex-col px-4'>
        <h4 className='font-bold text-xl'>Summary</h4>
        <p className='font-semibold text-xs'>Season 1</p>
      </div>
      <div className='flex flex-auto flex-shrink-1 justify-center'>
        <img className='chart px-4' src={sampleChart} alt='Chart' />
      </div>
    </div>
  </section>
);

export default PlayerHighlight;
