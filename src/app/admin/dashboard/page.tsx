'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/auth';
import { useArticleStats } from '@/auth/hooks/useArticleQueries';

import {
  FileText,
  Users,
  Briefcase,
  CreditCard,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  // real time stats 
  const { data: articleStats, isLoading: statsLoading } = useArticleStats();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

   const stats: StatCard[] = [
    {
      title: 'Total Articles',
      value: statsLoading ? '...' : articleStats?.total.toString() || '0',
      change: statsLoading 
        ? 'Loading...' 
        : `${articleStats?.published || 0} published, ${articleStats?.draft || 0} drafts`,
      icon: <FileText className="w-8 h-8 text-blue-600" />,
    },
    {
      title: 'Total Views',
      value: statsLoading ? '...' : articleStats?.totalViews.toLocaleString() || '0',
      change: 'Across all articles',
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
    },
    {
      title: 'Active Explorers',
      value: '5,678', // TODO: Replace when user stats endpoint is ready
      change: '+8% from last month',
      icon: <Users className="w-8 h-8 text-green-600" />,
    },
    {
      title: 'Active Partners',
      value: '234', // TODO: Replace when partner stats endpoint is ready
      change: '+5% from last month',
      icon: <Briefcase className="w-8 h-8 text-purple-600" />,
    },
  ];
  
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#B59157] to-[#EBB659] rounded-lg p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h2>
        <p className="text-blue-100">
          You&apos;re logged in as Super Admin. Manage articles, users, transactions, and more from here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500 hover:shadow-lg transition"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-green-600 text-xs mt-2 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change}
                </p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Articles */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Articles</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded">
                <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Article Title {i}</p>
                  <p className="text-sm text-gray-500">Posted 2 days ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">Order #{1000 + i}</span>
                </div>
                <span className="text-sm font-semibold text-gray-600">₦5,000</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Signups</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded">
                <Users className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">User Name {i}</p>
                  <p className="text-sm text-gray-500">Joined today</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Platform Health</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">98%</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">User Growth</p>
            <p className="text-2xl font-bold text-green-600 mt-1">+12%</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">Revenue</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">₦2.4M</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600">Active Sessions</p>
            <p className="text-2xl font-bold text-orange-600 mt-1">1,234</p>
          </div>
        </div>
      </div>
    </div>
  );
}
