import React, { useState } from 'react';
import { FILTER_TYPES } from '../hooks/useStarWarsData';
import '../common.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState(FILTER_TYPES.NAME);

  const handleInputChange = (event) => setSearchTerm(event.target.value);
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchTerm, filter);
    onSearch(searchTerm, filter);
  };

  return (
    <div>
      <input type='text' value={searchTerm} onChange={handleInputChange} />
      <button className='search-button' onClick={handleSearch}>
        Search
      </button>
      <div className='radio-group'>
        <div className='radio'>
          <input
            type='radio'
            name='filter'
            defaultChecked
            value={FILTER_TYPES.NAME}
            onChange={handleFilterChange}
          />
          <label htmlFor={FILTER_TYPES.TYPE_1}>Name</label>
        </div>
        <div className='radio'>
          <input
            type='radio'
            name='filter'
            value={FILTER_TYPES.SPECIES}
            onChange={handleFilterChange}
          />
          <label htmlFor={FILTER_TYPES.TYPE_2}>Species</label>
        </div>
        <div className='radio'>
          <input
            type='radio'
            name='filter'
            value={FILTER_TYPES.PLANET}
            onChange={handleFilterChange}
          />
          <label htmlFor={FILTER_TYPES.TYPE_3}>Planets</label>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
