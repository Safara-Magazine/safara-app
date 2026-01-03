'use client';

import Image from 'next/image';
import { Linkedin, Twitter, Github, Globe, Mail } from 'lucide-react';
import { useTeamMembers } from '@/hooks/useTeamMemberQueries';

export default function TeamPage() {
  const { data: teamMembers = [], isLoading, error } = useTeamMembers();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Loading team...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold">Error loading team</p>
          <p className="mt-2">{error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  }

  // Filter only published members and sort by order
  const publishedMembers = teamMembers
    .filter((member) => member.published)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The talented individuals behind Safara Magazine, dedicated to bringing you the best content.
          </p>
        </div>

        {/* Team Grid */}
        {publishedMembers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No team members to display at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Member Image */}
                <div className="relative h-80 bg-gradient-to-br from-gray-200 to-gray-300">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                  
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {member.about}
                  </p>

                  {/* Contact and Social Links */}
                  <div className="space-y-3">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="text-sm">{member.email}</span>
                    </a>

                    {/* Social Media Icons */}
                    <div className="flex space-x-4 pt-2">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                          title="LinkedIn"
                        >
                          <Linkedin className="w-6 h-6" />
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-blue-400 transition-colors"
                          title="Twitter"
                        >
                          <Twitter className="w-6 h-6" />
                        </a>
                      )}
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                          title="GitHub"
                        >
                          <Github className="w-6 h-6" />
                        </a>
                      )}
                      {member.portfolio && (
                        <a
                          href={member.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-purple-600 transition-colors"
                          title="Portfolio"
                        >
                          <Globe className="w-6 h-6" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
