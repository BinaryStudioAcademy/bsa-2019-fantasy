import React from 'react';
import ReactDropdown, { ReactDropdownProps } from 'react-dropdown';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const Dropdown = (props: ReactDropdownProps) => {
  return (
    <ReactDropdown
      controlClassName='flex justify-center items-center cursor-pointer px-6 py-2'
      menuClassName='absolute bg-white left-0 whitespace-no-wrap py-2 min-w-full border border-greyBorder'
      arrowClosed={
        <div className='absolute right-0 pr-2'>
          <FaChevronDown />
        </div>
      }
      arrowOpen={
        <div className='absolute right-0 pr-2'>
          <FaChevronUp />
        </div>
      }
      {...props}
      className={`bg-white font-semibold text-sm rounded border border-greyBorder text-center ${props.className}`}
    />
  );
};

export default Dropdown;
