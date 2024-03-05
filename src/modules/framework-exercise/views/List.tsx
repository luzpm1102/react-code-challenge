import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import { setPokemonList } from '../store/slice/pokemonSlice';
import { useEffect, useState } from 'react';
import { CircularProgress, Typography, Pagination, Input } from '@mui/material';
import { getAllPokemons } from '../store/selectors';
import { Pokemon, PokemonData } from '../types';
import ListUI from '../components/common/List';

const List = () => {
  const { usePokemonListQuery } = api;
  const dispatch = useDispatch();
  const allPokemon = useSelector(getAllPokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(60);
  const offset = (currentPage - 1) * limit;

  const { data, isLoading } = usePokemonListQuery({ offset, limit });

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setPokemonList(data.results));
    }
  }, [dispatch, isLoading, data, currentPage]);

  if (isLoading) return <CircularProgress />;

  const handlePageChange = (_, page: number) => {
    setCurrentPage(page);
  };

  const dataFormat = (data: PokemonData[]): Pokemon[] => {
    return data.map((item) => {
      const parts = item.url.split('/');
      const id = parts[parts.length - 2];
      return {
        id: Number(id),
        name: item.name,
      };
    });
  };

  return (
    <div>
      <Typography variant='h4' gutterBottom>
        Pokemon List
      </Typography>
      <Input
        type='number'
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
      />

      <ListUI data={dataFormat(allPokemon)} />
      <Pagination
        count={Math.ceil(data.count / limit)}
        page={currentPage}
        onChange={handlePageChange}
        color='primary'
        style={{ marginBottom: 15, display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
};

export default List;
