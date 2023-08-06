import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setLoggedInUser: (state, action) => {
      return action.payload;
    },
    logOutUser: () => {
      return null;
    },
  },
});

export const { setLoggedInUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;