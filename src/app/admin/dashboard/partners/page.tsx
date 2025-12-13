'use client';

import { useState } from 'react';
import { Search, Mail, Briefcase, Clock, MoreVertical, TrendingUp } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  email: string;
  service: string;
  joinDate: string;
  articles: number;
  rating: number;
  status: 'active' | 'inactive' | 'pending';
}

const mockPartners: Partner[] = [
  {
    id: '1',
    name: 'Photography Pro',
    email: 'photo@example.com',
    service: 'Photography',
    joinDate: '2024-06-15',
    articles: 24,
    rating: 4.8,
    status: 'active',
  },
  {
    id: '2',
    name: 'Travel Expert',
    email: 'travel@example.com',
    service: 'Tour Guiding',
    joinDate: '2024-07-20',
    articles: 18,
    rating: 4.6,
    status: 'active',
  },
  {
    id: '3',
    name: 'Tech Consultant',
    email: 'tech@example.com',
    service: 'Consulting',
    joinDate: '2024-08-05',
    articles: 5,
    rating: 4.3,
    status: 'pending',
  },
  {
    id: '4',
    name: 'Design Studio',
    email: 'design@example.com',
    service: 'Design',
    joinDate: '2024-05-10',
    articles: 12,
    rating: 4.9,
    status: 'active',
  },
];

export default function PartnersPage() {
  const [search, setSearch] = useState('');
  const [partners] = useState(mockPartners);

  const filteredPartners = partners.filter(
    (partner) =>
      partner.name.toLowerCase().includes(search.toLowerCase()) ||
      partner.email.toLowerCase().includes(search.toLowerCase()) ||
      partner.service.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = partners.filter((p) => p.status === 'active').length;
  const totalArticles = partners.reduce((sum, p) => sum + p.articles, 0);
  const avgRating = (partners.reduce((sum, p) => sum + p.rating, 0) / partners.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Partners Management</h2>
        <p className="text-gray-600 mt-1">Manage and monitor all Partner users and their services</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Partners</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{partners.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Active Partners</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{activeCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Articles Published</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{totalArticles}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Avg Rating</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{avgRating} ⭐</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search partners by name, email, or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-900"
          />
        </div>
      </div>

      {/* Partners Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Service</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Joined</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Articles</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Rating</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPartners.map((partner) => (
              <tr key={partner.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">{partner.name}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Briefcase className="w-4 h-4" />
                    <span>{partner.service}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Mail className="w-4 h-4" />
                    <span>{partner.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Clock className="w-4 h-4" />
                    <span>{partner.joinDate}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1 text-gray-900 font-medium">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    {partner.articles}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{partner.rating} ⭐</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      partner.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : partner.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {partner.status === 'active'
                      ? 'Active'
                      : partner.status === 'pending'
                      ? 'Pending'
                      : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded transition">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredPartners.length}</span> partners
        </p>
      </div>
    </div>
  );
}
