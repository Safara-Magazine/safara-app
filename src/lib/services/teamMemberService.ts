/**
 * Team Member Service
 * Handles all team member API calls to the backend
 */

import axios from "axios";
import { BACKEND_BASE_URL } from "@/auth/lib/backendConfig";

// ============================================================================
// TYPES
// ============================================================================

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  about: string;
  image: string;
  email: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  portfolio?: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTeamMemberRequest {
  name: string;
  role: string;
  about: string;
  image: string;
  email: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  portfolio?: string;
  order: number;
  published: boolean;
}

export interface UpdateTeamMemberRequest {
  name?: string;
  role?: string;
  about?: string;
  image?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  portfolio?: string;
  order?: number;
  published?: boolean;
}

export interface TeamMembersResponse {
  status: string;
  data: TeamMember[];
  count: number;
}

export interface TeamMemberResponse {
  status: string;
  message?: string;
  data: TeamMember;
}

// ============================================================================
// TEAM MEMBER CRUD OPERATIONS
// ============================================================================

/**
 * Get all team members
 */
export const getTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    const response = await axios.get<TeamMembersResponse>(
      `${BACKEND_BASE_URL}/api/team-members`
    );
    return response.data.data || [];
  } catch (error) {
    console.error("[TeamMemberService] Error fetching team members:", error);
    throw error;
  }
};

/**
 * Get a single team member by ID
 */
export const getTeamMemberById = async (id: string): Promise<TeamMember> => {
  try {
    const response = await axios.get<TeamMemberResponse>(
      `${BACKEND_BASE_URL}/api/team-members/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error(`[TeamMemberService] Error fetching team member ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new team member (SuperAdmin only)
 */
export const createTeamMember = async (
  data: CreateTeamMemberRequest,
  token: string
): Promise<TeamMember> => {
  try {
    const response = await axios.post<TeamMemberResponse>(
      `${BACKEND_BASE_URL}/api/team-members`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("[TeamMemberService] Error creating team member:", error);
    throw error;
  }
};

/**
 * Update a team member (SuperAdmin only)
 */
export const updateTeamMember = async (
  id: string,
  data: UpdateTeamMemberRequest,
  token: string
): Promise<TeamMember> => {
  try {
    const response = await axios.patch<TeamMemberResponse>(
      `${BACKEND_BASE_URL}/api/team-members/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(`[TeamMemberService] Error updating team member ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a team member (SuperAdmin only)
 */
export const deleteTeamMember = async (
  id: string,
  token: string
): Promise<void> => {
  try {
    await axios.delete(`${BACKEND_BASE_URL}/api/team-members/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(`[TeamMemberService] Error deleting team member ${id}:`, error);
    throw error;
  }
};
