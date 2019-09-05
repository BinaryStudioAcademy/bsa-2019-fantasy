import React from 'react';
import yellowCard from 'assets/images/yellow-card.svg';
import ball from 'assets/images/ball.svg';
import cn from 'classnames';
import moment from 'moment';

import styles from './EventBar.module.scss';

interface EventsProps {
  events: any[];
  position: 'top' | 'bottom';
}

const eventList = {
  goal: {
    icon: ball,
  },
  yellowCard: {
    icon: yellowCard,
  },
};

export const EventBar: React.SFC<EventsProps> = ({ events, position }) => {
  const elements = events.reduce((acc, event, index) => {
    const eventProps = eventList[event.name];
    if (eventProps) {
      const elapsed = Math.round(moment.duration(event.elapsed).asMinutes());
      const style =
        position === 'top'
          ? styles.lineTop
          : position === 'bottom'
          ? styles.lineBottom
          : undefined;
      const element = (
        <div
          key={index}
          className={cn(styles.marker, 'pointer')}
          style={{ left: (event.elapsed / (90 * 60 * 1000)) * 100 + '%' }}
        >
          <img className='h-4' src={eventProps.icon} alt={event.name} />
          <div className={style}></div>
          <div
            className={cn(
              styles.tooltip,
              'bg-background rounded text-sm leading-none whitespace-no-wrap ml-2 p-1 -my-1',
            )}
          >
            {`${elapsed}′ - ${event.player.second_name}`}
          </div>
        </div>
      );
      return [...acc, element];
    } else {
      return acc;
    }
  }, []);
  return <div className='w-full relative h-4'>{elements}</div>;
};
