import React from 'react';
import CharacterCard from './characterCard';
import '../common.css';

const CharacterGrid = ({
  characters = [{ name: 'C3PO', world: 'Earth', species: 'Droid' }],
}) => {
  return (
    <div className='character-grid'>
      {characters.map((character) => (
        <CharacterCard key={character.name} character={character} />
      ))}
    </div>
  );
};

export default CharacterGrid;
