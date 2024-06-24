import React from 'react';
import '../../scss/components/Search.scss';

interface SearchProps {
  setParPage: (value: number) => void;
  setSearchValue: (value: string) => void;
  searchValue: string;
}

const Search: React.FC<SearchProps> = ({ setParPage, setSearchValue, searchValue }) => {
  return (
    <div className='controls'>
      <select onChange={(e) => setParPage(parseInt(e.target.value))}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option> 
      </select>
      <input 
        onChange={(e) => setSearchValue(e.target.value)} 
        value={searchValue} 
        type="text" 
        placeholder='search'
      />
    </div>
  );
};

export default Search;
