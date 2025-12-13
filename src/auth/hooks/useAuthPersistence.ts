/**
 * Auth Persistence Hook
 * Restores auth token and validates it on app load
 */

import { useEffect } from 'react';
import { useAuthStore } from '@/auth/store/useAuthStore';

export const useAuthPersistence = () => {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      // Check if we have a stored token
      const token = localStorage.getItem('authToken');
      
      if (token && !user) {
        console.log('[useAuthPersistence] Token found in localStorage, validating...');
        
        // Try to validate the token with the backend
        try {
          const response = await fetch('http://localhost:4000/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log('[useAuthPersistence] Token valid, restoring user:', data);
            
            // Set user from response
            if (data.user || data.data?.user) {
              const userData = data.user || data.data.user;
              setUser({
                id: userData.id || userData.user_id,
                email: userData.email,
                name: userData.name,
                role: userData.role,
              });
            }
          } else {
            console.log('[useAuthPersistence] Token invalid, clearing');
            localStorage.removeItem('authToken');
          }
        } catch (error) {
          console.error('[useAuthPersistence] Error validating token:', error);
          localStorage.removeItem('authToken');
        }
      }
    };

    initializeAuth();
  }, [user, setUser]);
};
