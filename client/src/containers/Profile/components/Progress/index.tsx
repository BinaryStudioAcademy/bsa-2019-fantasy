import React from 'react';
import cn from 'classnames';
import { FaUserCog, FaStar, FaEnvelope } from 'react-icons/fa';

import styles from './styles.module.scss';

type Props = {
  step: number;
  navToStep: (s: number) => void;
};

const steps = [
  {
    name: '1. Personal details',
    Icon: FaUserCog,
  },
  {
    name: '2. Favourite club',
    Icon: FaStar,
  },
  {
    name: '3. Email preferences',
    Icon: FaEnvelope,
  },
];

const Progress = ({ step, navToStep }: Props) => {
  return (
    <div className='-mr-1 px-12 py-4 bg-white rounded shadow-figma'>
      <div className={styles.steps}>
        {steps.map((s, idx) => (
          <div
            className='my-8 flex items-center cursor-pointer hover:underline'
            key={`progress-step-${s.name}`}
            onClick={() => navToStep(idx + 1)}
            role='presentation'
          >
            <div
              className={cn(
                { 'bg-primary': step === idx + 1 },
                'shadow mr-3 mb-1 bg-gray-500 text-white text-2xl rounded-full h-16 w-16 flex items-center justify-center relative',
              )}
            >
              {idx > 0 && <div className={styles.connector} />}
              <s.Icon />
            </div>
            <span className='text-sm text-secondary'>{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;
