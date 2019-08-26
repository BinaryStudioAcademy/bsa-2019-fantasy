import React from 'react';
import ReactDropdown, { ReactDropdownProps } from 'react-dropdown';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const Dropdown = (props: ReactDropdownProps) => {
  return (
    <ReactDropdown
      controlClassName='flex items-baseline cursor-pointer px-6 py-2'
      menuClassName='absolute bg-white left-0 whitespace-no-wrap py-2 min-w-full border border-greyBorder'
      arrowClosed={<FaChevronDown className='ml-4' />}
      arrowOpen={<FaChevronUp className='ml-4' />}
      {...props}
      className={`bg-white font-semibold text-sm rounded border border-greyBorder relative ${props.className}`}
    />
  );
};

export default Dropdown;
