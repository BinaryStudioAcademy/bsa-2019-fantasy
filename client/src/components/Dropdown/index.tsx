import React from 'react';
import ReactDropdown, { ReactDropdownProps } from 'react-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';

const Dropdown = (props: ReactDropdownProps) => {
  console.log(props.className);
  return (
    <ReactDropdown
      controlClassName='flex items-baseline cursor-pointer px-6 py-2'
      menuClassName='absolute bg-white left-0 whitespace-no-wrap py-2 min-w-full border border-greyBorder'
      arrowClosed={<FontAwesomeIcon icon={faChevronDown} className='ml-4' size='xs' />}
      arrowOpen={<FontAwesomeIcon icon={faChevronUp} className='ml-4' size='xs' />}
      {...props}
      className={`bg-white font-semibold text-sm rounded border border-greyBorder relative ${props.className}`}
    />
  );
};

export default Dropdown;
