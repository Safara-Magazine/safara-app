'use client';

import { useState } from 'react';
import { Search, Mail, Clock, MoreVertical } from 'lucide-react';

interface Explorer {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  articles: number;
  status: 'active' | 'inactive';
}

const mockExplorers: Explorer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    joinDate: '2024-06-15',
    articles: 12,
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    joinDate: '2024-07-20',
    articles: 8,
    status: 'active',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    joinDate: '2024-05-10',
    articles: 0,
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    joinDate: '2024-08-05',
    articles: 5,
    status: 'active',
  },
];

export default function ExplorersPage() {
  const [search, setSearch] = useState('');
  const [explorers] = useState(mockExplorers);

  const filteredExplorers = explorers.filter(
    (explorer) =>
      explorer.name.toLowerCase().includes(search.toLowerCase()) ||
      explorer.email.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = explorers.filter((e) => e.status === 'active').length;
  const totalArticles = explorers.reduce((sum, e) => sum + e.articles, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Explorers Management</h2>
        <p className="text-gray-600 mt-1">Manage and monitor all Explorer users on the platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Explorers</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{explorers.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Active Users</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{activeCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Articles Read</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{totalArticles}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search explorers by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-900"
          />
        </div>
      </div>

      {/* Explorers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Joined</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Articles</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredExplorers.map((explorer) => (
              <tr key={explorer.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">{explorer.name}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Mail className="w-4 h-4" />
                    <span>{explorer.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Clock className="w-4 h-4" />
                    <span>{explorer.joinDate}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{explorer.articles}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      explorer.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {explorer.status === 'active' ? 'Active' : 'Inactive'}
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
          Showing <span className="font-semibold">{filteredExplorers.length}</span> explorers
        </p>
      </div>
    </div>
  );
}
