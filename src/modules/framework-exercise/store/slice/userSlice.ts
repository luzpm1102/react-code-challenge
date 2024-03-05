import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;
