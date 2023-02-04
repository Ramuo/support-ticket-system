import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});




//DOCUMENTATION
// https://redux.js.org/tutorials/essentials/part-2-app-structure
// https://redux.js.org/tutorials/essentials/part-1-overview-concepts
