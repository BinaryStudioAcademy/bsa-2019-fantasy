import React, { useEffect, useRef } from 'react';
import cn from 'classnames';

import { renderComment } from './renderComment';

import styles from './styles.module.scss';

export const CommentaryList = ({ events }) => {
  const logRef = useRef<HTMLDivElement>(null);
  console.log('render commentaryList');

  const scrollDown = () => {
    if (logRef) {
      const current = logRef.current;
      if (current) current.scrollTop = current.scrollHeight;
    }
  };
  useEffect(scrollDown, [events]);

  return (
    <div
      ref={logRef}
      className={cn(styles['noScrollbar'], 'h-32 flex-1 max-w-md text-sm')}
    >
      {events.map((event) => (
        <p key={event.elapsed}>{renderComment(event)}</p>
      ))}
    </div>
  );
};
