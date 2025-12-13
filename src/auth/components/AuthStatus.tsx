/**
 * Auth Status Component
 * Shows current authentication status
 */

"use client";
import { useAuthStore } from "../store";

export function AuthStatus() {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <div className="p-4 bg-white rounded-lg border">
      <h3 className="font-semibold mb-2">Authentication Status</h3>
      <p className="text-sm mb-2">
        Status: {isAuthenticated ? "Logged in" : "Not logged in"}
      </p>
      {isAuthenticated && user && (
        <div className="text-sm space-y-1">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}
