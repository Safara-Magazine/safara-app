/**
 * User Service
 * Handles all user/admin API calls
 */

import axios from "axios";
import { BACKEND_BASE_URL } from "@/auth/lib/backendConfig";

// ============================================================================
// TYPES
// ============================================================================

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  explorers: number;
  partners: number;
  deactivatedUsers: number;
  newUsersThisMonth?: number;
  // Add other fields based on what your backend actually returns
}

export interface UserStatsResponse {
  status: string;
  message: string;
  data: UserStats;
}

// ============================================================================
// GET USER STATS
// ============================================================================

export const getUserStats = async (): Promise<UserStats> => {
  try {
    console.log("[userService] Fetching user stats");
    const response = await axios.get<UserStatsResponse>(
      `${BACKEND_BASE_URL}/api/admin/users/stats`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    console.log("[userService] Stats fetched:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("[userService] Error fetching stats:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch user statistics"
      );
    }
    throw error;
  }
};

// You can add more user-related functions here later:
// export const getAllUsers = async () => { ... }
// export const getUserById = async (userId: string) => { ... }
// export const deleteUser = async (userId: string) => { ... }