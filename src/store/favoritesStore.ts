import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: string[];
  _hasHydrated: boolean; // Add this
  setHasHydrated: (state: boolean) => void; // Add this
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      _hasHydrated: false, // Add this

      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },

      toggleFavorite: (id: string) => {
        const current = get().favorites;
        const exists = current.includes(id);
        
        const newFavorites = exists 
          ? current.filter(fav => fav !== id)
          : [...current, id];
        
        set({ favorites: newFavorites });
      },

      isFavorite: (id: string) => get().favorites.includes(id),
    }),
    {
      name: 'safara-favorites',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);