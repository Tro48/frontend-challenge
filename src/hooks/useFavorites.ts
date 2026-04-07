import { useEffect, useState } from 'react';

export interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
}

const STORAGE_KEY = 'favorite_cats';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Cat[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      return JSON.parse(stored) as Cat[];
    } catch (e) {
      console.error('Ошибка при загрузке избранного:', e);
      return [];
    }
  });

  // Сохранение в localStorage при изменении
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (cat: Cat) => {
    setFavorites((prev) => {
      if (prev.some((c) => c.id === cat.id)) return prev;
      return [...prev, cat];
    });
  };

  const removeFavorite = (catId: string) => {
    setFavorites((prev) => prev.filter((c) => c.id !== catId));
  };

  const isFavorite = (catId: string) => {
    return favorites.some((c) => c.id === catId);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
