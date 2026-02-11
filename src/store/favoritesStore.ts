import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: new Set<string>(),

      toggleFavorite: (id: string) => {
        set((state) => {
          const next = new Set(state.favorites);
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          return { favorites: next };
        });
      },

      isFavorite: (id: string) => get().favorites.has(id),
    }),
    {
      name: 'safara-favorites',
      // Zustand persist doesn't natively handle Set — serialize/deserialize manually
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          return {
            ...parsed,
            state: {
              ...parsed.state,
              favorites: new Set<string>(parsed.state.favorites ?? []),
            },
          };
        },
        setItem: (name, value) => {
          const serialized = {
            ...value,
            state: {
              ...value.state,
              favorites: Array.from(value.state.favorites),
            },
          };
          localStorage.setItem(name, JSON.stringify(serialized));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);