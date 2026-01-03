import { create } from "zustand";
import { TeamMember } from "@/lib/services/teamMemberService";

interface TeamMemberState {
  teamMembers: TeamMember[];
  selectedMember: TeamMember | null;
  setTeamMembers: (members: TeamMember[]) => void;
  setSelectedMember: (member: TeamMember | null) => void;
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
  removeTeamMember: (id: string) => void;
}

export const useTeamMemberStore = create<TeamMemberState>((set) => ({
  teamMembers: [],
  selectedMember: null,
  
  setTeamMembers: (members) => set({ teamMembers: members }),
  
  setSelectedMember: (member) => set({ selectedMember: member }),
  
  addTeamMember: (member) =>
    set((state) => ({
      teamMembers: [...state.teamMembers, member],
    })),
  
  updateTeamMember: (id, updates) =>
    set((state) => ({
      teamMembers: state.teamMembers.map((member) =>
        member.id === id ? { ...member, ...updates } : member
      ),
    })),
  
  removeTeamMember: (id) =>
    set((state) => ({
      teamMembers: state.teamMembers.filter((member) => member.id !== id),
    })),
}));
