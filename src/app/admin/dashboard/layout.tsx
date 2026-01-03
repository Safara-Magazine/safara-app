'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/auth';
import {
  MenuIcon,
  XIcon,
  FileText,
  Users,
  Briefcase,
  CreditCard,
  ShoppingCart,
  User,
  LogOut,
  Home,
  Package,
  UsersRound,
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: <Home className="w-5 h-5" /> },
  { name: 'Articles', href: '/admin/dashboard/articles', icon: <FileText className="w-5 h-5" /> },
  { name: 'Products', href: '/admin/dashboard/products', icon: <Package className="w-5 h-5" /> },
  { name: 'Team Members', href: '/admin/dashboard/team-members', icon: <UsersRound className="w-5 h-5" /> },
  { name: 'Explorers', href: '/admin/dashboard/explorers', icon: <Users className="w-5 h-5" /> },
  { name: 'Partners', href: '/admin/dashboard/partners', icon: <Briefcase className="w-5 h-5" /> },
  { name: 'Transactions', href: '/admin/dashboard/transactions', icon: <CreditCard className="w-5 h-5" /> },
  { name: 'Orders', href: '/admin/dashboard/orders', icon: <ShoppingCart className="w-5 h-5" /> },
  { name: 'Profile', href: '/admin/dashboard/profile', icon: <User className="w-5 h-5" /> },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    console.log("[AdminLayout] Checking auth - user:", user, "role:", user?.role);

    // Check if user is admin
    if (user?.role === 'SUPER_ADMIN') {
      console.log("[AdminLayout] User is SUPER_ADMIN, allowing access");
      setIsAuthorized(true);
    } else if (user !== null && user?.role !== 'SUPER_ADMIN') {
      // User is logged in but not admin
      console.log("[AdminLayout] User is not SUPER_ADMIN, redirecting to home");
      setIsAuthorized(false);
      router.push('/');
    } else {
      // User is not logged in, wait a moment for auth store to populate
      console.log("[AdminLayout] No user yet, waiting for store to populate");
      const timer = setTimeout(() => {
        console.log("[AdminLayout] After timeout - user:", user, "role:", user?.role);
        if (!user || user?.role !== 'SUPER_ADMIN') {
          setIsAuthorized(false);
          router.push('/');
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [user, isMounted, router]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('authToken');
    router.push('/');
  };

  if (!isMounted || isAuthorized === null) return null;

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-800 text-white transition-all duration-300 flex flex-col overflow-y-auto`}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {sidebarOpen && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-[#B59157] to-[#EBB659] rounded-lg flex items-center justify-center font-bold">
                SA
              </div>
              <span className="font-bold text-lg">Admin</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-gray-800 rounded transition"
          >
            {sidebarOpen ? (
              <XIcon className="w-5 h-5" />
            ) : (
              <MenuIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                pathname === item.href
                  ? 'bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
              title={!sidebarOpen ? item.name : undefined}
            >
              {item.icon}
              {sidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 space-y-2">
          {sidebarOpen && (
            <div className="px-4 py-2 bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-400">Logged in as</p>
              <p className="text-sm font-semibold truncate">{user?.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${
              sidebarOpen ? 'justify-start space-x-3 px-4' : 'justify-center'
            } py-3 text-gray-300 hover:bg-red-900 hover:text-white rounded-lg transition`}
            title={!sidebarOpen ? 'Logout' : undefined}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            {navItems.find((item) => item.href === pathname)?.name || 'Dashboard'}
          </h1>
          <div className="text-sm text-gray-600">
            Welcome, <span className="font-semibold">{user?.name}</span>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
