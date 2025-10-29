"use client"

import React from "react"
import { Mail, Phone } from "lucide-react"

export default function Footer() {
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-[#4a2c5e] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Newsletter Section */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <div className="w-12 h-12 bg-[#d4af8f] rounded flex items-center justify-center font-bold text-[#4a2c5e] text-sm">
                SAFARI
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4">Be the first to hear about new deals and promotions</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-3 py-2 bg-white text-[#4a2c5e] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af8f]"
              />
              <button
                type="submit"
                className="px-4 py-2 self-center mt-2 bg-[#d4af8f] w-[132px] text-[#4a2c5e] font-semibold rounded hover:bg-[#c9a07a] transition-colors text-sm"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </form>
          </div>

          {/* Navigation Links - Column 1 */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-[#d4af8f] transition-colors text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#d4af8f] transition-colors text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#d4af8f] transition-colors text-sm">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#d4af8f] transition-colors text-sm">
                  Categories
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Contact - Column 2 */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-[#d4af8f] transition-colors text-sm">
                  X
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#d4af8f] transition-colors text-sm">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#d4af8f] transition-colors text-sm">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#d4af8f] transition-colors text-sm">
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-[#d4af8f] transition-colors text-sm flex items-center gap-2"
                >
                  <Mail size={16} />
                  Email
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-[#d4af8f] transition-colors text-sm flex items-center gap-2"
                >
                  <Phone size={16} />
                  Call us
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Legal - Column 3 */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-[#d4af8f] transition-colors text-sm">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#d4af8f] transition-colors text-sm">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#d4af8f] transition-colors text-sm">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#d4af8f] transition-colors text-sm">
                  Partners
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#d4af8f] transition-colors text-sm">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#d4af8f] transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="bg-linear-to-b from-[#B59157] to-[#EBB659]"/>
        <div className="  pt-6 ">
          <p className="text-center text-gray-400 text-xs">
            COPYRIGHT 2025 SAFARI TOURISM & TRAVELS. ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  )
}
