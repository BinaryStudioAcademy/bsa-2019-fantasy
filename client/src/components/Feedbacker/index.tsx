import React from 'react';
import cn from 'classnames';
import { FaTimes } from 'react-icons/fa';
import { FeedbackContainer, DelayWrapper } from 'react-feedbacker';

import styles from './styles.module.scss';

export const Feedbacker = () => (
  <FeedbackContainer closeAfterMs={10000} delayCloseMs={160}>
    {({ items, closeItem, getDelayWrapperProps }) => (
      <div className={styles.notificationContainer}>
        {items.slice(0, 5).map((item) => (
          <DelayWrapper key={item.id} {...getDelayWrapperProps({ item })}>
            <div
              className={cn(
                styles.notificationItem,
                'bg-secondary',
                'text-primary',
                'rounded border-l-8',
                'shadow-lg',
                {
                  'border-red-600': item.kind === 'error',
                  'border-yellow-600': item.kind === 'warning',
                  'border-green-500': item.kind === 'success',
                },
              )}
            >
              <span className='mx-2'>{item.message}</span>
              <button type='button' className='ml-2' onClick={() => closeItem(item)}>
                <FaTimes />
              </button>
            </div>
          </DelayWrapper>
        ))}
      </div>
    )}
  </FeedbackContainer>
);
