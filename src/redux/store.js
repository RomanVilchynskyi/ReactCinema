import { configureStore } from '@reduxjs/toolkit';
import { favoriteSessionsReducer } from './selFav/selFav.reducer';


export const store = configureStore({
  reducer: {
    favoriteSessions: favoriteSessionsReducer 
  }
});