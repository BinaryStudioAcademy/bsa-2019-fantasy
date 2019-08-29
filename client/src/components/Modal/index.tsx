import React from 'react';
import cn from 'classnames';
import { FaTimes } from 'react-icons/fa';

import s from './styles.module.scss';

type Props = {
  className?: string;
  children: React.ReactNode;
  showCondition?: boolean;
  onClose: () => void;
};

const Modal = ({ className, children, onClose, showCondition = true }: Props) => {
  return showCondition ? (
    <div className={s.modalWrapper} onMouseDown={onClose} role='presentation'>
      <div
        className={cn(className, s.modal, 'shadow-lg', 'rounded')}
        onMouseDown={(e) => e.stopPropagation()}
        role='presentation'
      >
        <button
          className={cn(s.modalClose, 'shadow-md', 'hover:shadow-lg')}
          onClick={onClose}
        >
          <FaTimes />
        </button>
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
