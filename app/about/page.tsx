'use client'

import { useEffect, useState } from 'react'
import { loadConfig, defaultConfig } from '@/lib/config'

export default function About() {
  // Start with default to match server render
  const [config, setConfig] = useState(defaultConfig)

  useEffect(() => {
    // Only load from localStorage after mount (client-side only)
    setConfig(loadConfig())
    
    const interval = setInterval(() => {
      setConfig(loadConfig())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn more about our mission, values, and the team behind our success
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600">
                {config.about.mission}
              </p>
            </div>
            <div className="bg-primary-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Our Values</h3>
              <ul className="space-y-3">
                {config.about.values.map((value, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span className="text-gray-700">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {config.about.team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-primary-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl text-primary-700">👤</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary-600 mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-primary-600 rounded-xl p-12 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">{config.about.stats.clients}</div>
              <div className="text-primary-100">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{config.about.stats.years}</div>
              <div className="text-primary-100">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{config.about.stats.team}</div>
              <div className="text-primary-100">Team Members</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

