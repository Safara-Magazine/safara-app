'use client';

import { useState } from 'react';
import { Search, Package, User, Calendar, Eye } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  items: number;
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customer: 'John Doe',
    email: 'john@example.com',
    items: 3,
    amount: 15000,
    date: '2024-12-10',
    status: 'completed',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    items: 1,
    amount: 5000,
    date: '2024-12-09',
    status: 'completed',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customer: 'Mike Johnson',
    email: 'mike@example.com',
    items: 5,
    amount: 25000,
    date: '2024-12-08',
    status: 'pending',
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    customer: 'Sarah Williams',
    email: 'sarah@example.com',
    items: 2,
    amount: 10000,
    date: '2024-12-07',
    status: 'completed',
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-005',
    customer: 'Robert Brown',
    email: 'robert@example.com',
    items: 1,
    amount: 3500,
    date: '2024-12-06',
    status: 'failed',
  },
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-800',
};

export default function OrdersPage() {
  const [search, setSearch] = useState('');
  const [orders] = useState(mockOrders);

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.email.toLowerCase().includes(search.toLowerCase())
  );

  const completedOrders = orders.filter((o) => o.status === 'completed').length;
  const totalRevenue = orders
    .filter((o) => o.status === 'completed')
    .reduce((sum, o) => sum + o.amount, 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Orders Management</h2>
        <p className="text-gray-600 mt-1">Track and manage all customer orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Orders</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{orders.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Completed Orders</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{completedOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Revenue</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">₦{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Pending Orders</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{pendingOrders}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by order number, customer, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-900"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Order Number</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Items</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">{order.orderNumber}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{order.customer}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">{order.email}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <p className="font-medium text-gray-900">{order.items}</p>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">₦{order.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Calendar className="w-4 h-4" />
                    <span>{order.date}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status === 'pending'
                      ? 'Pending'
                      : order.status === 'completed'
                      ? 'Completed'
                      : order.status === 'failed'
                      ? 'Failed'
                      : 'Cancelled'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition" title="View">
                    <Eye className="w-4 h-4" />
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
          Showing <span className="font-semibold">{filteredOrders.length}</span> orders
        </p>
      </div>
    </div>
  );
}
