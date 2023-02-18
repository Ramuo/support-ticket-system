import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import ticketReducer from '../features/tickets/ticketSlice';
import noteReducer from '../features/notes/noteSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    notes: noteReducer
  },
});





//DOCUMENTATION:
// REPOS: https://github.com/bradtraversy/support-desk/tree/bugfix

// TO FIX THE APP BUG
// https://github.com/bradtraversy/support-desk#bug-fixes-corrections-and-code-faq

// https://redux.js.org/tutorials/essentials/part-2-app-structure
// https://redux.js.org/tutorials/essentials/part-1-overview-concepts
