import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Typography, Button, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import { setPokemonSelected } from '../store/slice/pokemonSlice';
import { getPokemonSelected } from '../store/selectors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddFavoriteModal from '../components/favorites/AddFavoriteModal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SinglePokemon = () => {
  const { id } = useParams();
  const { usePokemonDetailQuery } = api;
  const { isLoading, data, isError } = usePokemonDetailQuery({ id });
  const [toggleImage, setToggleImage] = useState('');
  const selectedPokemon = useSelector(getPokemonSelected);
  const [favorite, setFavorite] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && data) {
      setToggleImage(data.sprites.front_default);
      dispatch(setPokemonSelected(data));
    }
  }, [isLoading, data, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!selectedPokemon || isError) {
    return <div>No data available for this Pokemon.</div>;
  }

  const { name, abilities, height, sprites, types, weight } = selectedPokemon;

  const handleImageClick = () => {
    setToggleImage((prevImage) =>
      prevImage === sprites.front_default
        ? sprites.front_shiny
        : sprites.front_default
    );
  };

  return (
    <>
      <Card style={{ margin: 15, padding: 15 }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={toggleImage}
            alt={name}
            height={200}
            onClick={handleImageClick}
            style={{ cursor: 'pointer' }}
          />
          <div style={{ marginLeft: 20 }}>
            <Typography
              variant='h4'
              gutterBottom
              style={{ textTransform: 'uppercase' }}>
              {name}
            </Typography>
            <Typography variant='subtitle1'>
              Height: {height}, Weight: {weight}
            </Typography>
            <Typography variant='body1'>
              Abilities:{' '}
              {abilities.map((ability) => ability.ability.name).join(', ')}
            </Typography>
            <Typography variant='body1'>
              Types: {types.map((type) => type.type.name).join(', ')}
            </Typography>
            <Button
              variant='contained'
              color='error'
              startIcon={<FavoriteIcon />}
              onClick={() => setOpenModal(true)}
              style={{ marginTop: 10 }}>
              {favorite ? 'Remove from favorites' : 'Add to Favorites'}
            </Button>
          </div>
        </div>
      </Card>
      <AddFavoriteModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        pokemon={{ id: Number(id), name }}
        favorite={favorite}
        setFavorite={() => setFavorite(!favorite)}
      />
    </>
  );
};

export default SinglePokemon;
