import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHouses } from '../../Redux/Reducers/houseSlice';

const Search = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    dispatch(fetchHouses(searchTerm));
  };

  return (
    <div>
        <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginBottom: '8px'
        }}
        />
      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
