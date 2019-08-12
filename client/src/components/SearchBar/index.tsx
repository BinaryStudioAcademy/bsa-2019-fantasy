import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

type SearchBarProps = {
  className?: string;
};

const SearchBar = (props: SearchBarProps) => {
  return (
    <div className='search-bar relative flex items-center min-w-0'>
      <FontAwesomeIcon icon={faSearch} className='absolute left-0 mx-3' />
      <input
        className={`header-search shadow font-medium appearance-none border rounded min-w-0 pl-8 pr-3 py-2 leading-normal outline-none focus:shadow-outline ${props.className}`}
        type='text'
        placeholder='Search'
      />
    </div>
  );
};

export default SearchBar;
