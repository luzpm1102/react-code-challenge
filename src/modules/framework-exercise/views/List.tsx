import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import { setPokemonList } from '../store/slice/pokemonSlice';
import { useEffect, useState } from 'react';
import {
  ListItemText,
  CircularProgress,
  Typography,
  List as ListUI,
  ListItemIcon,
  ListItemButton,
  Pagination,
} from '@mui/material';
import { getAllPokemons } from '../store/selectors';
import PokeballIcon from '../../../assets/PokeBall_icon.png';

const List = () => {
  const { usePokemonListQuery } = api;
  const dispatch = useDispatch();
  const allPokemon = useSelector(getAllPokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 60;
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

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
  };

  return (
    <div>
      <Typography variant='h4' gutterBottom>
        Pokemon List
      </Typography>
      <ListUI style={gridStyle}>
        {allPokemon.map((item) => {
          const parts = item.url.split('/');
          const id = parts[parts.length - 2];
          return (
            <ListItemButton
              key={item.name}
              component={Link}
              to={`/pokemon/${id}`}>
              <ListItemIcon>
                <img
                  src={PokeballIcon}
                  alt='Pokeball'
                  style={{ width: 24, height: 24 }}
                />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          );
        })}
      </ListUI>
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
