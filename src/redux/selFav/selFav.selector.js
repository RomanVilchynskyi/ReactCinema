import { createSelector } from "@reduxjs/toolkit";

export const selectFavoriteSessions = state => state.favoriteSessions.items;

export const selectNearestFavoriteSession = createSelector(
    [selectFavoriteSessions],
    (items) => {
        const now = new Date();
        const future = items
            .map(x => ({ ...x, startDate: new Date(x.start) }))
            .filter(x => x.startDate > now)
            .sort((a, b) => a.startDate - b.startDate);

        return future[0] || null;
    }
);