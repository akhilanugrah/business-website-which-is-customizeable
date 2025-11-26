'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { loadConfig, defaultConfig } from '@/lib/config'

export default function Footer() {
  // Start with default to match server render
  const [config, setConfig] = useState(defaultConfig)

  useEffect(() => {
    // Only load from localStorage after mount (client-side only)
    setConfig(loadConfig())
    
    // Reload config when localStorage changes
    const interval = setInterval(() => {
      setConfig(loadConfig())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{config.company.name}</h3>
            <p className="text-gray-400">
              {config.company.tagline}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Support
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {config.company.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

