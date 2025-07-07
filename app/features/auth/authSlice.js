import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      const { id, name, role, photoUrl, access_token } = action.payload;
      if (access_token) {
        localStorage.setItem("access_token", access_token);
      }

      state.user = { id, name, role, photoUrl };
      state.isLoading = false;
    },
    signOut: (state) => {
      localStorage.removeItem("access_token");
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;