import React from 'react';
import './characterCard.css';

const CharacterCard = ({ character }) => {
  const { name, world, species } = character;

  return (
    <div className='card'>
      <h2>{name}</h2>
      <div>
        <p>Species: {species}</p>
        <p>Homeworld: {world}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
