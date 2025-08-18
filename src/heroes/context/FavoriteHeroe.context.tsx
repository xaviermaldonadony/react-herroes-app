import type { Hero } from '../types/hero.interface';
import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';

interface FavoriteHeroContext {
  // state
  favorites: Hero[];
  favoriteCount: number;

  //   methods
  isFavorite: (hero: Hero) => boolean;
  toggleFavorites: (hero: Hero) => void;
}
// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

const getFavoritesFromLocalStorage = (): Hero[] => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

export const FavoriteHeroeProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(
    getFavoritesFromLocalStorage()
  );

  const toggleFavorites = (hero: Hero) => {
    const heroExist = favorites.find((h) => h.id === hero.id);

    if (heroExist) {
      setFavorites(favorites.filter((h) => h.id !== hero.id));
      return;
    }

    setFavorites([...favorites, hero]);
  };

  const isFavorite = (hero: Hero) => favorites.some((h) => h.id === hero.id);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteHeroContext
      value={{
        favoriteCount: favorites.length,
        favorites,

        // methods
        isFavorite,
        toggleFavorites,
      }}
    >
      {children}
    </FavoriteHeroContext>
  );
};
