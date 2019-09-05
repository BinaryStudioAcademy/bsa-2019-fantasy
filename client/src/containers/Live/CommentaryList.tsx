import React, { useEffect, useRef } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';
import { createComment } from './createComment';
import SingleComment from './SingleComment';

export const CommentaryList = ({ events, status }) => {
  const logRef = useRef<HTMLDivElement>(null);

  const scrollDown = () => {
    if (logRef) {
      const current = logRef.current;
      if (current) current.scrollTop = current.scrollHeight;
    }
  };
  useEffect(scrollDown, [events]);

  return (
    <div ref={logRef} className={cn(styles['noScrollbar'], 'text-sm')}>
      {events.map((event) => {
        const comment = event.comment || createComment(event, status);
        return (
          <p key={`${event.elapsed}-${event.name}`}>
            <SingleComment text={comment} />
          </p>
        );
      })}
    </div>
  );
};
