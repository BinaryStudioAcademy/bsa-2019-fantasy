import React, { useState } from 'react';
import moment from 'moment';
import { useInterval } from 'helpers/hooks/interval.hook';

const getLeft = (time) => moment.duration(moment(time).diff());

const format = (number) => {
  const numStr = String(number);
  const prefixZeroCount = 2 - numStr.length;
  return prefixZeroCount <= 0 ? numStr : Array(prefixZeroCount + 1).join('0') + numStr;
};

export const SingleNumber = ({ children, className = 'bg-red-500' }) => (
  <div
    className={`text-white text-6xl font-semibold rounded px-3 m-1 shadow-figma ${className}`}
  >
    {children}
  </div>
);

export const Unit = ({ children, subtitle, className = 'bg-red-500' }) => {
  const stringValue = format(children);
  return (
    <div className='m-2'>
      <div className={`flex`}>
        {stringValue.split('').map((num, index) => (
          <SingleNumber className={className} key={index}>
            {num}
          </SingleNumber>
        ))}
      </div>
      <p className='text-center font-bold text-white'>{subtitle}</p>
    </div>
  );
};

export const Countdown = ({ time }) => {
  const [left, setLeft] = useState(getLeft(time));
  useInterval(() => setLeft(getLeft(time)), 1000);

  return (
    <div
      className='flex mt-6 mb-auto rounded'
      style={{ backgroundColor: 'rgba(18, 39, 55, 0.67)' }}
    >
      <Unit className='bg-orange-600' subtitle='days'>
        {left.days()}
      </Unit>
      <Unit className='bg-green-600' subtitle='hours'>
        {left.hours()}
      </Unit>
      <Unit className='bg-red-600' subtitle='minutes'>
        {left.minutes()}
      </Unit>
      <Unit className='bg-purple-600' subtitle='seconds'>
        {left.seconds()}
      </Unit>
    </div>
  );
};
