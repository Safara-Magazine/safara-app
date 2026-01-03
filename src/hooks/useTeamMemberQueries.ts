/**
 * Team Member React Query Hooks
 * Custom hooks for managing team member data with React Query
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  type CreateTeamMemberRequest,
  type UpdateTeamMemberRequest,
} from "@/lib/services/teamMemberService";

// ============================================================================
// QUERY HOOKS
// ============================================================================

/**
 * Hook to fetch all team members
 */
export const useTeamMembers = () => {
  return useQuery({
    queryKey: ["teamMembers"],
    queryFn: getTeamMembers,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook to fetch a single team member by ID
 */
export const useTeamMemberById = (id: string) => {
  return useQuery({
    queryKey: ["teamMembers", id],
    queryFn: () => getTeamMemberById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

// ============================================================================
// MUTATION HOOKS
// ============================================================================

/**
 * Hook to create a new team member (SuperAdmin only)
 */
export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTeamMemberRequest) => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Not authenticated");
      }
      return createTeamMember(data, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    },
    onError: (error) => {
      console.error("[useCreateTeamMember] Error:", error);
    },
  });
};

/**
 * Hook to update a team member (SuperAdmin only)
 */
export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateTeamMemberRequest;
    }) => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Not authenticated");
      }
      return updateTeamMember(id, data, token);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
      queryClient.invalidateQueries({ queryKey: ["teamMembers", variables.id] });
    },
    onError: (error) => {
      console.error("[useUpdateTeamMember] Error:", error);
    },
  });
};

/**
 * Hook to delete a team member (SuperAdmin only)
 */
export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Not authenticated");
      }
      return deleteTeamMember(id, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    },
    onError: (error) => {
      console.error("[useDeleteTeamMember] Error:", error);
    },
  });
};
