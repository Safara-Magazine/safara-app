/**
 * User Profile Component
 * Shows logged-in user info and logout button
 */

"use client";

import { useLogout } from "../hooks";
import { useAuthStore } from "../store";

export function UserProfile() {
  const { user, isAuthenticated } = useAuthStore();
  const { mutate: logout, isPending } = useLogout();

  if (!isAuthenticated) {
    return <p className="text-gray-600">Not logged in</p>;
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      <div>
        <p className="font-semibold">{user?.name}</p>
        <p className="text-sm text-gray-600">{user?.email}</p>
      </div>
      <button
        onClick={() => logout()}
        disabled={isPending}
        className="ml-auto px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
      >
        {isPending ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
