'use client';

import { useAuthPersistence } from '@/auth/hooks/useAuthPersistence';

/**
 * Auth Provider Component
 * Handles auth persistence and initialization
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // This hook restores auth from localStorage on mount
  useAuthPersistence();

  return <>{children}</>;
}
