import { createContext, useContext, useState } from 'react';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]); 

  const toggleFavorite = (filmId) => {
    setFavorites(prev =>
      prev.includes(filmId) ? prev.filter(id => id !== filmId) : [...prev, filmId]
    );
  };

  const isFavorite = (filmId) => favorites.includes(filmId);

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);

