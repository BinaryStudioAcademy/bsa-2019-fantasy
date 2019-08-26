import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

type SearchBarProps = {
  className?: string;
  onChange?: any;
  value?: string;
};

const SearchBar = (props: SearchBarProps) => {
  const { t } = useTranslation();

  return (
    <div className='search-bar relative flex items-center min-w-0'>
      <FaSearch className='absolute left-0 mx-3' />
      <input
        className={`header-search shadow-figma font-medium appearance-none border rounded min-w-0 pl-8 pr-3 py-2 leading-normal outline-none focus:shadow-outline ${props.className}`}
        type='text'
        placeholder={t('search')}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};

export default SearchBar;
