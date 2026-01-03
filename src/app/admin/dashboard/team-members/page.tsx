'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, EyeOff, Linkedin, Twitter, Github, Globe } from 'lucide-react';
import TeamMemberFormModal from '@/components/TeamMemberFormModal';
import TeamMemberDetailModal from '@/components/TeamMemberDetailModal';
import NotificationModal from '@/components/NotificationModal';
import {
  useTeamMembers,
  useCreateTeamMember,
  useUpdateTeamMember,
  useDeleteTeamMember,
} from '@/hooks/useTeamMemberQueries';
import type { TeamMember, CreateTeamMemberRequest, UpdateTeamMemberRequest } from '@/lib/services/teamMemberService';

export default function TeamMembersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | undefined>(undefined);
  const [detailMember, setDetailMember] = useState<TeamMember | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [notification, setNotification] = useState<{
    isOpen: boolean;
    type: 'success' | 'error' | 'confirm';
    title: string;
    message: string;
    onConfirm?: () => void;
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
  });

  // Queries
  const { data: teamMembers = [], isLoading, error } = useTeamMembers();

  // Mutations
  const createMutation = useCreateTeamMember();
  const updateMutation = useUpdateTeamMember();
  const deleteMutation = useDeleteTeamMember();

  const handleOpenModal = (member?: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(undefined);
  };

  const handleSubmit = async (data: CreateTeamMemberRequest | UpdateTeamMemberRequest) => {
    try {
      if (selectedMember) {
        // Update existing member
        await updateMutation.mutateAsync({
          id: selectedMember.id,
          data: data as UpdateTeamMemberRequest,
        });
        handleCloseModal();
        setNotification({
          isOpen: true,
          type: 'success',
          title: 'Success',
          message: 'Team member updated successfully!',
        });
      } else {
        // Create new member
        await createMutation.mutateAsync(data as CreateTeamMemberRequest);
        handleCloseModal();
        setNotification({
          isOpen: true,
          type: 'success',
          title: 'Success',
          message: 'Team member created successfully!',
        });
      }
    } catch (error) {
      console.error('Error saving team member:', error);
      setNotification({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: `Failed to save team member: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  };

  const handleDelete = (member: TeamMember) => {
    setNotification({
      isOpen: true,
      type: 'confirm',
      title: 'Confirm Delete',
      message: `Are you sure you want to delete ${member.name}? This action cannot be undone.`,
      onConfirm: async () => {
        try {
          await deleteMutation.mutateAsync(member.id);
          setNotification({
            isOpen: true,
            type: 'success',
            title: 'Success',
            message: 'Team member deleted successfully!',
          });
        } catch (error) {
          console.error('Error deleting team member:', error);
          setNotification({
            isOpen: true,
            type: 'error',
            title: 'Error',
            message: `Failed to delete team member: ${error instanceof Error ? error.message : 'Unknown error'}`,
          });
        }
      },
    });
  };

  const handleTogglePublish = async (member: TeamMember) => {
    try {
      await updateMutation.mutateAsync({
        id: member.id,
        data: { published: !member.published },
      });
    } catch (error) {
      console.error('Error toggling publish status:', error);
      setNotification({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: `Failed to update publish status: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  };

  const handleViewDetails = (member: TeamMember) => {
    setDetailMember(member);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setDetailMember(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Loading team members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold">Error loading team members</p>
          <p className="mt-2">{error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  }

  // Sort team members by order
  const sortedMembers = [...teamMembers].sort((a, b) => a.order - b.order);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
          <p className="mt-2 text-gray-600">Manage team member profiles</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Team Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Total Members</p>
          <p className="text-3xl font-bold text-gray-900">{teamMembers.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Published</p>
          <p className="text-3xl font-bold text-green-600">
            {teamMembers.filter((m) => m.published).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Drafts</p>
          <p className="text-3xl font-bold text-gray-600">
            {teamMembers.filter((m) => !m.published).length}
          </p>
        </div>
      </div>

      {/* Team Members Grid */}
      {sortedMembers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No team members yet. Add your first team member to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Member Image */}
              <div
                className="relative h-64 bg-gray-200 cursor-pointer overflow-hidden group"
                onClick={() => handleViewDetails(member)}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                  quality={75}
                />
                <div className="absolute top-2 right-2 flex space-x-2 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTogglePublish(member);
                    }}
                    className={`p-2 rounded-full ${
                      member.published ? 'bg-green-500' : 'bg-gray-500'
                    } text-white hover:opacity-80 transition-opacity shadow-lg`}
                    title={member.published ? 'Published' : 'Draft'}
                  >
                    {member.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
                <div className="absolute top-2 left-2 z-10">
                  {/* <span className="px-2 py-1 bg-black bg-opacity-60 text-white text-xs rounded shadow-lg">
                    Order: {member.order}
                  </span> */}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm font-medium px-4 py-2 bg-black/40 rounded">
                    Click to view details
                  </span>
                </div>
              </div>

              {/* Member Info */}
              <div className="p-6">
                <h3
                  className="text-xl font-bold text-gray-900 mb-1 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => handleViewDetails(member)}
                >
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">
                  {member.about.length > 100
                    ? `${member.about.substring(0, 100)}...`
                    : member.about}
                </p>
                <p className="text-gray-500 text-xs mb-4">{member.email}</p>

                {/* Social Links */}
                <div className="flex space-x-3 mb-4">
                  {member.linkedin && (
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </Link>
                  )}
                  {member.twitter && (
                    <Link
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-400 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </Link>
                  )}
                  {member.github && (
                    <Link
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </Link>
                  )}
                  {member.portfolio && (
                    <Link
                      href={member.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                    </Link>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleOpenModal(member)}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member)}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      <TeamMemberFormModal
        isOpen={isModalOpen}
        isLoading={createMutation.isPending || updateMutation.isPending}
        member={selectedMember}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />

      {/* Detail Modal */}
      <TeamMemberDetailModal
        isOpen={isDetailModalOpen}
        member={detailMember}
        onClose={handleCloseDetailModal}
      />

      {/* Notification Modal */}
      <NotificationModal
        isOpen={notification.isOpen}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={() => setNotification({ ...notification, isOpen: false })}
        onConfirm={notification.onConfirm}
      />
    </div>
  );
}
