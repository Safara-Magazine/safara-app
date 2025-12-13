import { create } from "zustand";

interface UIState {
  isSidebarOpen: boolean;
  isSearchOpen: boolean;
  theme: "light" | "dark";
  toggleSidebar: () => void;
  toggleSearch: () => void;
  setTheme: (theme: "light" | "dark") => void;
  closeSidebar: () => void;
  closeSearch: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isSearchOpen: false,
  theme: "light",
  
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  setTheme: (theme) => set({ theme }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  closeSearch: () => set({ isSearchOpen: false }),
}));
