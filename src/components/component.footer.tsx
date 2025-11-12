"use client"

import React from "react"
import { Mail, Phone } from "lucide-react"

export default function Footer() {
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)

  const handleSubscribe = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const footerLinks = {
    company: [
      { label: "Home", href: "#" },
      { label: "About", href: "#" },
      { label: "Services", href: "#" },
      { label: "Categories", href: "#" }
    ],
    connect: [
      { label: "X", href: "#" },
      { label: "Facebook", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Email", href: "#", icon: Mail },
      { label: "Call us", href: "#", icon: Phone }
    ],
    support: [
      { label: "Services", href: "#" },
      { label: "Support", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Partners", href: "#" },
      { label: "Terms and Conditions", href: "#" },
      { label: "Privacy Policy", href: "#" }
    ]
  }

  return (
    <footer className="bg-[#4a2c5e] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="mb-6">
              <div className="w-12 h-12 bg-[#d4af8f] rounded flex items-center justify-center font-bold text-[#4a2c5e] text-sm">
                SAFARA
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4">Be the first to hear about new deals and promotions</p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 bg-white text-[#4a2c5e] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af8f]"
              />
              <button
                onClick={handleSubscribe}
                className="px-4 py-2 self-center mt-2 bg-[#d4af8f] w-[132px] text-[#4a2c5e] font-semibold rounded hover:bg-[#c9a07a] transition-colors text-sm"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-300 hover:text-[#d4af8f] transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide">Connect</h3>
            <ul className="space-y-2">
              {footerLinks.connect.map((link) => {
                const Icon = link.icon
                return (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-300 hover:text-[#d4af8f] transition-colors text-sm flex items-center gap-2">
                      {Icon && <Icon size={16} />}
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-300 hover:text-[#d4af8f] transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-[#B59157]" />
        <div className="pt-6">
          <p className="text-center text-gray-400 text-xs">
            COPYRIGHT 2025 SAFARI TOURISM & TRAVELS. ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  )
}