"use client"

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const StoreNavigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="bg-white/80 md:px-[44px] backdrop-blur-md border-b border-gray-200 fixed top-0 left-0 right-0 z-50 shadow-sm">
        <nav className="px-10 sm:px-6 lg:px-8 py-3 lg:py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 z-50">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/BrandLogo.png"
                  alt="Logo"
                  className="md:h-15 sm:h-10 w-auto object-contain"
                  width={100}
                  height={100}
                />
              </Link>
            </div>

            {/* mobile menu btn */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="z-50 p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 top-[200px] sm:top-[65px]"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu - Slides from Left */}
      <div className={`fixed left-0 top-[57px] sm:top-[65px] bottom-0 w-72 bg-white z-50 overflow-y-auto shadow-2xl transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="px-4 py-6 space-y-4">
          {/* Add your menu items here */}
        </div>
      </div>
    </>
  );
};

export default StoreNavigation;