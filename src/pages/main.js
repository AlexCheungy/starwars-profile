import React from 'react';
import SearchBar from '../components/searchBar';
import CharacterGrid from '../components/characterGrid';
import { useStarWarsData } from '../hooks/useStarWarsData';
import '../common.css';

const Main = () => {
  const { peopleList, isLoading, isError, search } = useStarWarsData();

  const handleSearch = (searchTerm, filterType) =>
    search(searchTerm, filterType);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  return (
    <div className='main-container'>
      <SearchBar onSearch={handleSearch} />
      <CharacterGrid characters={peopleList} />
    </div>
  );
};

export default Main;
