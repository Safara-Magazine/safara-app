// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface User {
//   id: string;
//   email: string;
//   name: string;
//   role?: string;
// }

// interface AuthState {
//   user: User | null;
//   isLoading: boolean;
//   error: string | null;
//   isAuthenticated: boolean;

//   setUser: (user: User | null) => void;
//   setLoading: (loading: boolean) => void;
//   setError: (error: string | null) => void;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       user: null,
//       isLoading: false,
//       error: null,
//       isAuthenticated: false,

//       setUser: (user) =>
//         set({
//           user,
//           isAuthenticated: !!user,
//           error: null,
//         }),

//       setLoading: (isLoading) => set({ isLoading }),

//       setError: (error) => set({ error }),

//       logout: () =>
//         set({
//           user: null,
//           isAuthenticated: false,
//           error: null,
//         }),
//     }),
//     {
//       name: "auth-store",
//       partialize: (state) => ({
//         user: state.user,
//         isAuthenticated: state.isAuthenticated,
//       }),
//     }
//   )
// );


import { create } from "zustand";
import { persist } from "zustand/middleware";

// ============================================================================
// TYPES
// ============================================================================

interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  token: string | null; // ✅ added — was missing before
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void; // ✅ added
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

// ============================================================================
// STORE
// ============================================================================

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null, // ✅ added
      isLoading: false,
      error: null,
      isAuthenticated: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          error: null,
        }),

      // ✅ added — called after successful login to store the token
      setToken: (token) => set({ token }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      logout: () =>
        set({
          user: null,
          token: null, // ✅ clears token on logout
          isAuthenticated: false,
          error: null,
        }),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        token: state.token, // ✅ token is now persisted to localStorage
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);