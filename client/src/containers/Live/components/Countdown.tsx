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
  <div className={`text-white text-5xl font-semibold rounded py-2 px-4 m-1 ${className}`}>
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
      <p className='text-center'>{subtitle}</p>
    </div>
  );
};

export const Countdown = () => {
  const time = moment(1568111642050).add(1, 'day');
  const [left, setLeft] = useState(getLeft(time));
  useInterval(() => setLeft(getLeft(time)), 1000);

  return (
    <div className='flex'>
      <Unit className='bg-orange-500' subtitle='days'>
        {left.days()}
      </Unit>
      <Unit className='bg-green-500' subtitle='hours'>
        {left.hours()}
      </Unit>
      <Unit className='bg-red-500' subtitle='minutes'>
        {left.minutes()}
      </Unit>
      <Unit className='bg-purple-500' subtitle='seconds'>
        {left.seconds()}
      </Unit>
    </div>
  );
};
