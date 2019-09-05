import React from 'react';
import yellowCard from 'assets/images/yellow-card.svg';
import { access } from 'fs';

interface EventsProps {
  events: any[];
}

const eventList = {
  goal: {
    icon: '/',
  },
  yellowCard: {
    icon: '/',
  },
};

// ${Math.round(moment.duration(elapsed).asMinutes())}

export const EventBar: React.SFC<EventsProps> = ({ events }) => {
  const elements = events.reduce(
    (acc, event) => eventList[event.name] && acc.push(event),
    [],
  );
  return <div className='w-full relative'>{}</div>;
};
