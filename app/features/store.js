import { configureStore } from '@reduxjs/toolkit';
import { signInApi } from './services/usersApi';

import authReducer from './auth/authSlice';

export const store = configureStore({
  reducer: {
    [signInApi.reducerPath]: signInApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(signInApi.middleware),
});

export default store;
