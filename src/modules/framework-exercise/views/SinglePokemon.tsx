import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { Card } from '@mui/material';

const SinglePokemon = () => {
  const { id } = useParams();
  const { usePokemonDetailQuery } = api;
  const { isLoading, data } = usePokemonDetailQuery({ id });
  const [toggleImage, setToggleImage] = useState('');

  useEffect(() => {
    if (!isLoading && data) {
      setToggleImage(data.sprites.front_default);
    }
  }, [isLoading, data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available for this Pokemon.</div>;
  }

  const { name, abilities, height, sprites, types, weight } = data;

  const handleImageClick = () => {
    setToggleImage((prevImage) =>
      prevImage === sprites.front_default
        ? sprites.front_shiny
        : sprites.front_default
    );
  };

  return (
    <Card style={{ margin: 15 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
        }}>
        <img
          src={toggleImage}
          alt={name}
          height={200}
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
        />
        <div style={{ marginTop: '5px', textAlign: 'left' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Name: {name}</h2>
          <h3 style={{ fontSize: '18px' }}>Height: {height}</h3>
          <h3 style={{ fontSize: '18px' }}>Weight: {weight}</h3>
          <h3 style={{ fontSize: '18px' }}>
            Abilities:{' '}
            {abilities.map((ability, index, array) => (
              <span key={ability.ability.name}>
                {ability.ability.name}
                {index !== array.length - 1 && ', '}
              </span>
            ))}
          </h3>
          <h3 style={{ fontSize: '18px' }}>
            Types:{' '}
            {types.map((type, index, array) => (
              <span key={type.type.name}>
                {type.type.name}
                {index !== array.length - 1 && ', '}
              </span>
            ))}
          </h3>
        </div>
      </div>
    </Card>
  );
};

export default SinglePokemon;
