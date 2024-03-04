import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '../api';
import { setPokemonList } from '../store/slice/pokemonSlice';
import { useEffect } from 'react';
import { ListItem } from '@mui/material';

const List = () => {
  const { usePokemonListQuery } = api;
  const { isLoading, data } = usePokemonListQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) {
      dispatch(setPokemonList(data.results));
    }
  }, [dispatch, isLoading, data]);

  return (
    <div>
      <h1>Pokemon List</h1>
      <ul>
        {data &&
          data.results.map((item, index) => {
            const parts = item.url.split('/');
            const id = parts[parts.length - 2];
            return (
              <ListItem key={item.name}>
                <Link to={`/pokemon/${id}`}>
                  {index + 1}. {item.name}
                </Link>
              </ListItem>
            );
          })}
      </ul>
    </div>
  );
};

export default List;
