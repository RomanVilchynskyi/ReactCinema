import { createSlice, createSelector } from '@reduxjs/toolkit';
import { selectFavoriteSessions } from './selFav.selector';

const initialState = {
    items: [
        {
            id: '1|2025-08-16T12:00',
            movieId: '1',
            movieTitle: 'Inception',
            start: '2025-08-16T12:00'
        },
        {
            id: '2|2025-08-17T18:30',
            movieId: '2',
            movieTitle: 'Interstellar',
            start: '2025-08-17T18:30'
        },
        {
            id: '3|2025-08-15T21:00',
            movieId: '3',
            movieTitle: 'The Dark Knight',
            start: '2025-08-15T21:00'
        },
        {
            id: '4|2025-08-20T14:15',
            movieId: '4',
            movieTitle: 'Tenet',
            start: '2025-08-20T14:15'
        }
    ],
};


const slice = createSlice({
    name: 'favoriteSessions',
    initialState,
    reducers: {
        addFavoriteSession: (state, { payload }) => {
            // payload: { movieId, movieTitle, start }
            const id = `${payload.movieId}|${payload.start}`;
            if (!state.items.some(x => x.id === id)) {
                state.items.push({ id, ...payload });
            }
        },
        removeFavoriteSession: (state, { payload }) => {
            // payload: id
            state.items = state.items.filter(x => x.id !== payload);
        },
        clearFavorites: (state) => {
            state.items = [];
        }
    }
});




export const favoriteSessionsReducer = slice.reducer;
