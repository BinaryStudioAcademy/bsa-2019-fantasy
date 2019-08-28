import React, { ReactNode, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

import style from './styles.module.scss';

type ButtonProps = {
  className?: string;
  type?: 'link' | 'button' | 'label';
  href?: string;
  styling?: 'primary' | 'secondary';
  inactive?: boolean;
  onClick?: (e: SyntheticEvent) => void;
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
};

const styles = {
  default: 'border-2 font-semibold uppercase rounded px-6 py-2',
  primary: {
    default: 'bg-primary text-secondary border-primary ',
    hover: 'hover:bg-secondary hover:text-white hover:border-secondary',
  },
  secondary: {
    default: 'bg-white border-secondary2',
    hover: 'hover:bg-secondary hover:text-white hover:border-secondary',
  },
  inactive: 'opacity-50 cursor-not-allowed',
};

const Button = (props: ButtonProps) => {
  const styling = props.styling || 'primary';
  const className = `${styles.default} ${styles[styling].default} ${
    props.inactive ? styles.inactive : styles[styling].hover
  } ${props.className}`;

  switch (props.type) {
    case 'link':
      if (props.href) {
        return (
          <Link to={props.href} className={className} onClick={props.onClick}>
            {props.children}
          </Link>
        );
      }
      return <div className={className}>{props.children}</div>;
    case 'label':
      return (
        <label className={className}>
          {props.loading ? <FaSpinner className={style.spin} /> : props.children}
        </label>
      );
    default:
      return (
        <button className={className} onClick={props.onClick} disabled={props.disabled}>
          {props.children}
        </button>
      );
  }
};

export default Button;
