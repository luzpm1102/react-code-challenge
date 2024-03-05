import React, { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../firebase/user';
import { getUserFavorites } from '../../firebase/favorites';

import List from '../common/List';
import { getFavorites, getUsers } from '../../store/selectors';
import { setUsers } from '../../store/slice/userSlice';
import { setFavorites } from '../../store/slice/favoriteSlice';

const FavoritesList = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const favorites = useSelector(getFavorites);
  const users = useSelector(getUsers);

  useEffect(() => {
    const getUsers = async () => {
      const users = await getAllUsers();
      if (typeof users === 'string') {
        dispatch(setUsers(null));
      }
      if (typeof users === 'object') {
        dispatch(setUsers(users));
      }
    };
    getUsers();
  }, [dispatch]);

  const handleSelectChange = async (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value as string);
    const favorites = await getUserFavorites(event.target.value as string);
    if (favorites) {
      dispatch(setFavorites(favorites));
    }
  };

  return (
    <div style={{ margin: 25 }}>
      <FormControl fullWidth>
        <InputLabel>Select User</InputLabel>
        <Select value={selectedValue} onChange={handleSelectChange}>
          {users &&
            users.map((user) => (
              <MenuItem key={user.username} value={user.username}>
                {user.username}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {selectedValue && <div>{favorites && <List data={favorites} />}</div>}
    </div>
  );
};

export default FavoritesList;
