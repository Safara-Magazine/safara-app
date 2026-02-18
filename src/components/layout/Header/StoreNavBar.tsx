"use client";


import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Menu,
  X,
  Search,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CartIndicator from "@/components/cart/cart-indicator";
import FavoritesIndicator from "@/components/favorites/favorites-indicator";

interface DropdownItem {
  label: string;
  href: string;
}

const StoreNavigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);
  const storeRef = useRef<HTMLDivElement>(null);

  
  const storeItems: DropdownItem[] = [
    { label: "Merch", href: "/store?section=merch" },
    // will make it inline later sha
    { label: "Bookings", href: "/store" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        storeRef.current &&
        !storeRef.current.contains(event.target as Node)
      ) {
        setStoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [storeRef]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      const gsap = window.gsap;

      if (storeOpen && storeRef.current) {
        const dropdown = storeRef.current.querySelector(".dropdown-menu");
        gsap.fromTo(
          dropdown,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        );
      } else if (storeRef.current) {
        const dropdown = storeRef.current.querySelector(".dropdown-menu");
        gsap.to(dropdown, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: "power2.in",
        });
      }
    }
  }, [storeOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="bg-white  md:px-[44px] backdrop-blur-md border-b border-gray-200 fixed top-0 left-0 right-0 z-50 shadow-sm">
        <nav className="px-10 max-w-7xl mx-auto  sm:px-6 lg:px-8 py-3 lg:py-3">
          <div className="flex items-center justify-between ">
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
            <div className="flex">
              {/* search */}
              <button className="hidden md:block z-50 p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <Search className="w-6 h-6" />
              </button>

              {/* user */}
              <button className="hidden md:block z-50 p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <User className="w-6 h-6" />
              </button>

              {/* wishlist */}
              <Link href="/favorites">
              <button className=" z-50 p-2 text-gray-700 hover:text-gray-900 transition-colors relative">
                 <FavoritesIndicator />
              </button>
              </Link>

              {/* cart */}
              <Link href="/cart">

              <button className="z-50 p-2 text-gray-700 hover:text-gray-900 transition-colors">
                  <CartIndicator />
                </button>

              </Link>

              {/* hamburger icon */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="z-50 p-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu  */}
      <div
        className={`fixed scrollbar-hide left-0 top-0 h-screen md:w-90 w-70 bg-white z-50 overflow-y-auto shadow-2xl transition-transform duration-300  font-semibold ease-in-out ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-[24px] ">
          {/* Home */}
          <Link
            href="/"
            className="block px-6 py-4 text-[#262320] hover:bg-gray-50 transition-colors text-[16px]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>

          {/* About */}
          <Link
            href="/about"
            className="block px-6 py-4 text-[#262320] hover:bg-gray-50 transition-colors text-[16px] border-t border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>

          {/* Store Dropdown */}
          <div className="border-t border-gray-100" ref={storeRef}>
            <button
              onClick={() => setStoreOpen(!storeOpen)}
              className="flex items-center justify-between w-full px-6 py-4 text-[#262320] hover:bg-gray-50 transition-colors text-[16px]"
            >
              <span>Store</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-200 ${
                  storeOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {storeOpen && (
              <div className="">
                {storeItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="block px-12 py-3 text-gray-500 hover:text-[#262320] transition-colors text-sm"
                    scroll
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Contact us */}
          <Link
            href="/contact"
            className="block px-6 py-4 text-[#262320] hover:bg-gray-50 transition-colors text-[16px] border-t border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact us
          </Link>

          {/* Destination Highlights */}
          <Link
            href="/destination-highlights"
            className="block px-6 py-4 text-[#262320] hover:bg-gray-50 transition-colors text-[16px] border-t border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Destination Highlights
          </Link>

          {/* Taste of Naija */}
          <Link
            href="/taste-of-naija"
            className="block px-6 py-4 text-[#262320] hover:bg-gray-50 transition-colors text-[16px] border-t border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Taste of Naija
          </Link>

          {/* Lifestyle */}
          <Link
            href="/lifestyle"
            className="block px-6 py-4 text-[#262320] hover:bg-gray-50 transition-colors text-[16px] border-t border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Lifestyle
          </Link>

          {/* Fashion */}
          <Link
            href="/fashion"
            className="block px-6 py-4 text-[#262320] hover:bg-gray-50 transition-colors text-[16px] border-t border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Fashion
          </Link>

          {/* Interviews */}
          <Link
            href="/interviews"
            className="block px-6 py-4 text-[#262320] hover:bg-gray-50 transition-colors text-[16px] border-t border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Interviews
          </Link>

          {/* Events */}
          <Link
            href="/events"
            className="block px-6 py-4 text-[#262320] hover:bg-gray-50 transition-colors text-[16px] border-t border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Events
          </Link>

          {/* Culture */}
          <Link
            href="/culture"
            className="block px-6 py-4 text-[#262320] hover:bg-gray-50 transition-colors text-[16px] border-t border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Culture
          </Link>

          {/* Original Content */}
          <Link
            href="/original-content"
            className="block px-6 py-4 text-[#262320] hover:bg-gray-50 transition-colors text-[16px] border-t border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Original Content
          </Link>

          {/* Travel tips & Guides */}
          <Link
            href="/travel-tips"
            className="block px-6 py-4 text-[#262320] hover:bg-gray-50 transition-colors text-[16px] border-t border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Travel Tips & Guides
          </Link>
        </div>
      </div>
    </>
  );
};

export default StoreNavigation;
