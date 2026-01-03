'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X, Linkedin, Twitter, Github, Globe, Mail } from 'lucide-react';
import { TeamMember } from '@/lib/services/teamMemberService';

interface TeamMemberDetailModalProps {
  isOpen: boolean;
  member: TeamMember | null;
  onClose: () => void;
}

export default function TeamMemberDetailModal({
  isOpen,
  member,
  onClose,
}: TeamMemberDetailModalProps) {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Team Member Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Member Image */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-shrink-0">
              <Image
                src={member.image}
                alt={member.name}
                width={192}
                height={192}
                className="object-cover rounded-lg border border-gray-300"
              />
            </div>
            
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-blue-600 font-semibold text-lg mb-4">{member.role}</p>
              
              {/* Contact Info */}
              <div className="space-y-2">
                <Link
                  href={`mailto:${member.email}`}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  <span>{member.email}</span>
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mt-4">
                {member.linkedin && (
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6" />
                  </Link>
                )}
                {member.twitter && (
                  <Link
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-400 transition-colors"
                    title="Twitter"
                  >
                    <Twitter className="w-6 h-6" />
                  </Link>
                )}
                {member.github && (
                  <Link
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                    title="GitHub"
                  >
                    <Github className="w-6 h-6" />
                  </Link>
                )}
                {member.portfolio && (
                  <Link
                    href={member.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-purple-600 transition-colors"
                    title="Portfolio"
                  >
                    <Globe className="w-6 h-6" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">About</h4>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{member.about}</p>
          </div>

          {/* Status */}
          <div className="border-t border-gray-200 mt-6 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-600">Status:</span>
                <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                  member.published 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {member.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Display Order: {member.order}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
