import React from 'react';
import Fade from 'react-reveal/Fade';

import fieldEvents from './fieldEvents';
import field from 'assets/images/field.svg';

export const Field = ({ currentEvent }) => {
  const defaultAnimationProps = {
    duration: 500,
    opposite: true,
    distance: '50%',
  };

  return (
    <div className='relative'>
      {fieldEvents.map((event) => (
        <div className='absolute' style={event.style} key={`${event.name}-${event.team}`}>
          <Fade
            {...event.direction}
            when={
              currentEvent &&
              currentEvent.name === event.name &&
              currentEvent.team === event.team
            }
            {...defaultAnimationProps}
          >
            <img src={event.img} alt={`${event.name} - ${event.team}`} />
          </Fade>
        </div>
      ))}

      <img className='w-full' src={field} alt='Football field' />
    </div>
  );
};
