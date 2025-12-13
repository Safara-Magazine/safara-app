'use client';

import { useState } from 'react';
import { Search, ArrowUpRight, ArrowDownLeft, Calendar } from 'lucide-react';

interface Transaction {
  id: string;
  reference: string;
  type: 'credit' | 'debit';
  description: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    reference: 'TXN-2024-001',
    type: 'credit',
    description: 'Article Monetization',
    amount: 5000,
    date: '2024-12-10',
    status: 'completed',
  },
  {
    id: '2',
    reference: 'TXN-2024-002',
    type: 'debit',
    description: 'Admin Fee',
    amount: 500,
    date: '2024-12-09',
    status: 'completed',
  },
  {
    id: '3',
    reference: 'TXN-2024-003',
    type: 'credit',
    description: 'Subscription Payment',
    amount: 10000,
    date: '2024-12-08',
    status: 'completed',
  },
  {
    id: '4',
    reference: 'TXN-2024-004',
    type: 'credit',
    description: 'Service Revenue',
    amount: 7500,
    date: '2024-12-07',
    status: 'pending',
  },
  {
    id: '5',
    reference: 'TXN-2024-005',
    type: 'debit',
    description: 'Refund',
    amount: 2000,
    date: '2024-12-06',
    status: 'failed',
  },
];

export default function TransactionsPage() {
  const [search, setSearch] = useState('');
  const [transactions] = useState(mockTransactions);

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.reference.toLowerCase().includes(search.toLowerCase()) ||
      transaction.description.toLowerCase().includes(search.toLowerCase())
  );

  const totalAmount = transactions.reduce((sum, t) => {
    return sum + (t.type === 'credit' ? t.amount : -t.amount);
  }, 0);

  const completedCount = transactions.filter((t) => t.status === 'completed').length;
  const completedAmount = transactions
    .filter((t) => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const statusColors = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
        <p className="text-gray-600 mt-1">Track all financial transactions on the platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Balance</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">₦{totalAmount.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Completed Transactions</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{completedCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Completed Amount</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">₦{completedAmount.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Transactions</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{transactions.length}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by reference or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-900"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Reference</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">{transaction.reference}</p>
                </td>
                <td className="px-6 py-4 text-gray-700">{transaction.description}</td>
                <td className="px-6 py-4">
                  <div
                    className={`flex items-center space-x-2 ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {transaction.type === 'credit' ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                    <span className="font-medium">
                      {transaction.type === 'credit' ? '+' : '-'}₦
                      {transaction.amount.toLocaleString()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">₦{transaction.amount.toLocaleString()}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Calendar className="w-4 h-4" />
                    <span>{transaction.date}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[transaction.status]
                    }`}
                  >
                    {transaction.status === 'completed'
                      ? 'Completed'
                      : transaction.status === 'pending'
                      ? 'Pending'
                      : 'Failed'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredTransactions.length}</span> transactions
        </p>
      </div>
    </div>
  );
}
