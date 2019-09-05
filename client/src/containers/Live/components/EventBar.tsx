import React from 'react';

interface EventsProps {
  events: any[];
}

const eventsIcons = {
  goal: '',
  yellowCard: '',
};

export const EventBar: React.SFC<EventsProps> = ({ events }) => {
  return <div className='w-full relative'>{events.map((event) => null)}</div>;
};
