import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.isSignedIn = true;
      state.user = action.payload;
    },
    signOut: (state) => {
      state.isSignedIn = false;
      state.user = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
