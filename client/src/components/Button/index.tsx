import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = {
  href: string;
  className?: string;
  type?: 'link' | 'button';
  styling?: 'primary' | 'secondary';
  children: ReactNode;
};

const Button = (props: ButtonProps) => {
  const stylingClasses = {
    primary: 'bg-primary text-secondary border-primary',
    secondary: 'bg-white border-secondary2',
  };

  const styling = props.styling || 'primary';

  switch (props.type) {
    case 'link':
      return (
        <Link
          to={props.href}
          className={`border-2 font-semibold uppercase rounded px-6 py-2 ${
            stylingClasses[styling]
          } ${props.className}`}
        >
          {props.children}
        </Link>
      );
    default:
      return <button>Button</button>;
  }
};

export default Button;
