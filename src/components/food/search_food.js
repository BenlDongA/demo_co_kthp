
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className='search'>
      <AiOutlineSearch size={25} />
      <input
        className='bg-transparent p-2 w-full focus:outline-none'
        type='text'
        placeholder='Search foods'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
