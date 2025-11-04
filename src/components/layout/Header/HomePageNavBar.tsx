"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

interface DropdownItem {
  label: string;
  href: string;
}

const Navigation: React.FC = () => {
  const [storeOpen, setStoreOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const storeRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const storeItems: DropdownItem[] = [
    { label: 'New Arrivals', href: '/store/new' },
    { label: 'Best Sellers', href: '/store/best-sellers' },
    { label: 'Sale', href: '/store/sale' },
    { label: 'Collections', href: '/store/collections' },
  ];

  const categoryItems: DropdownItem[] = [
    { label: 'Technology', href: '/categories/technology' },
    { label: 'Lifestyle', href: '/categories/lifestyle' },
    { label: 'Business', href: '/categories/business' },
    { label: 'Culture', href: '/categories/culture' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (storeRef.current && !storeRef.current.contains(event.target as Node)) {
        setStoreOpen(false);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setCategoriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const gsap = window.gsap;

      if (storeOpen && storeRef.current) {
        const dropdown = storeRef.current.querySelector('.dropdown-menu');
        gsap.fromTo(
          dropdown,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
      }

      if (categoriesOpen && categoriesRef.current) {
        const dropdown = categoriesRef.current.querySelector('.dropdown-menu');
        gsap.fromTo(
          dropdown,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
      }
    }
  }, [storeOpen, categoriesOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 z-50">
              <a href="/" className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=150&h=50&fit=crop"
                  alt="Logo"
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <a
                href="/"
                className="text-base xl:text-lg text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B59157] to-[#EBB659] transition-all duration-300 group-hover:w-full"></span>
              </a>

              <a
                href="/about"
                className="text-base xl:text-lg text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B59157] to-[#EBB659] transition-all duration-300 group-hover:w-full"></span>
              </a>

              {/* Store Dropdown */}
              <div className="relative" ref={storeRef}>
                <button
                  onClick={() => setStoreOpen(!storeOpen)}
                  className="flex items-center space-x-1 text-base xl:text-lg text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
                >
                  <span>Store</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      storeOpen ? 'rotate-180' : ''
                    }`}
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B59157] to-[#EBB659] transition-all duration-300 group-hover:w-full"></span>
                </button>

                {storeOpen && (
                  <div className="dropdown-menu absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden">
                    {storeItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="block px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#B59157]/10 hover:to-[#EBB659]/10 hover:text-gray-900 transition-all duration-150"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="/contact"
                className="text-base xl:text-lg text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B59157] to-[#EBB659] transition-all duration-300 group-hover:w-full"></span>
              </a>

              <a
                href="/editors-note"
                className="text-base xl:text-lg text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 relative group whitespace-nowrap"
              >
                Editors Note
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B59157] to-[#EBB659] transition-all duration-300 group-hover:w-full"></span>
              </a>

              {/* Categories Dropdown */}
              <div className="relative" ref={categoriesRef}>
                <button
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className="flex items-center space-x-1 text-base xl:text-lg text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      categoriesOpen ? 'rotate-180' : ''
                    }`}
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B59157] to-[#EBB659] transition-all duration-300 group-hover:w-full"></span>
                </button>

                {categoriesOpen && (
                  <div className="dropdown-menu absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden">
                    {categoryItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="block px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#B59157]/10 hover:to-[#EBB659]/10 hover:text-gray-900 transition-all duration-150"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="/signin"
                className="px-5 xl:px-6 py-2 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-lg hover:shadow-lg hover:scale-105 font-medium transition-all duration-200"
              >
                Sign In
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden z-50 p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 top-[57px] sm:top-[65px]"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu - Slides from Left */}
      <div className={`lg:hidden fixed left-0 top-[57px] sm:top-[65px] bottom-0 w-72 bg-white z-50 overflow-y-auto shadow-2xl transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="px-4 py-6 space-y-4">
          <a
            href="/"
            className="block text-lg text-gray-700 hover:text-gray-900 font-medium py-3 border-b border-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </a>

          <a
            href="/about"
            className="block text-lg text-gray-700 hover:text-gray-900 font-medium py-3 border-b border-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>

          {/* Mobile Store Dropdown */}
          <div className="border-b border-gray-100">
            <button
              onClick={() => setStoreOpen(!storeOpen)}
              className="flex items-center justify-between w-full text-lg text-gray-700 hover:text-gray-900 font-medium py-3 transition-colors"
            >
              <span>Store</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-200 ${
                  storeOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {storeOpen && (
              <div className="pl-4 pb-3 space-y-2">
                {storeItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="block text-base text-gray-600 hover:text-gray-900 py-2 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="/contact"
            className="block text-lg text-gray-700 hover:text-gray-900 font-medium py-3 border-b border-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>

          <a
            href="/editors-note"
            className="block text-lg text-gray-700 hover:text-gray-900 font-medium py-3 border-b border-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Editors Note
          </a>

          {/* Mobile Categories Dropdown */}
          <div className="border-b border-gray-100">
            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="flex items-center justify-between w-full text-lg text-gray-700 hover:text-gray-900 font-medium py-3 transition-colors"
            >
              <span>Categories</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-200 ${
                  categoriesOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {categoriesOpen && (
              <div className="pl-4 pb-3 space-y-2">
                {categoryItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="block text-base text-gray-600 hover:text-gray-900 py-2 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="/signin"
            className="block w-full text-center px-6 py-3 mt-6 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-lg font-medium hover:shadow-lg transition-all"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sign In
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;