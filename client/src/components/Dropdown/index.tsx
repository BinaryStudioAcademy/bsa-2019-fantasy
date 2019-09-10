import React from 'react';
import ReactDropdown, { ReactDropdownProps } from 'react-dropdown';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

import 'react-dropdown/style.css';

const Dropdown = (props: ReactDropdownProps) => {
  const arrowClassnames = 'absolute top-0 right-0 flex items-center h-full pr-2';
  return (
    <ReactDropdown
      className={`bg-white font-semibold text-sm rounded border border-greyBorder text-center ${props.className}`}
      controlClassName='flex justify-center cursor-pointer pl-3 pr-8'
      menuClassName='bg-white left-0 whitespace-no-wrap py-2 min-w-full border border-greyBorder'
      arrowClosed={
        <div className={arrowClassnames}>
          <FaChevronDown />
        </div>
      }
      arrowOpen={
        <div className={arrowClassnames}>
          <FaChevronUp />
        </div>
      }
      {...props}
    />
  );
};

export default Dropdown;
