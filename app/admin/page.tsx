'use client'

import { useState, useEffect } from 'react'
import { BusinessConfig, defaultConfig, loadConfig, saveConfig } from '@/lib/config'
import { useRouter } from 'next/navigation'
import { isAuthenticated, adminExists, logout } from '@/lib/auth'

export default function AdminPage() {
  const router = useRouter()
  const [config, setConfig] = useState<BusinessConfig>(defaultConfig)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<'company' | 'contact' | 'homepage' | 'services' | 'about'>('company')
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    // Check authentication
    if (!adminExists()) {
      router.push('/setup')
      return
    }

    if (!isAuthenticated()) {
      router.push('/admin/login')
      return
    }

    setCheckingAuth(false)
    setConfig(loadConfig())
  }, [router])

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout? Any unsaved changes will be lost.')) {
      logout()
      router.push('/admin/login')
    }
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const handleSave = () => {
    saveConfig(config)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    // Reload the page to see changes
    setTimeout(() => window.location.reload(), 1000)
  }

  const handleSaveAndLogout = () => {
    saveConfig(config)
    setSaved(true)
    setTimeout(() => {
      logout()
      router.push('/admin/login')
    }, 1500)
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to default values?')) {
      setConfig(defaultConfig)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('businessConfig')
      }
      setTimeout(() => window.location.reload(), 500)
    }
  }

  const updateConfig = (path: string, value: any) => {
    setConfig(prev => {
      const newConfig = { ...prev }
      const keys = path.split('.')
      let current: any = newConfig
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (Array.isArray(current[keys[i]])) {
          current = current[keys[i]]
          const index = parseInt(keys[i + 1])
          if (keys.length === 3) {
            current[index][keys[2]] = value
            return newConfig
          }
        } else {
          current = current[keys[i]]
        }
      }
      
      current[keys[keys.length - 1]] = value
      return newConfig
    })
  }

  const tabs = [
    { id: 'company', label: 'Company' },
    { id: 'contact', label: 'Contact' },
    { id: 'homepage', label: 'Homepage' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' }
  ] as const

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customization Panel</h1>
              <p className="text-gray-600 mt-2">Customize your business website content</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                View Site
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
              >
                Reset to Default
              </button>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  {saved ? '✓ Saved!' : 'Save Changes'}
                </button>
                {saved && (
                  <button
                    onClick={handleSaveAndLogout}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
                    title="Save and logout"
                  >
                    Save & Logout
                  </button>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
                title="Logout from admin panel"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'company' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Company Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={config.company.name}
                  onChange={(e) => updateConfig('company.name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={config.company.tagline}
                  onChange={(e) => updateConfig('company.tagline', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={config.company.description}
                  onChange={(e) => updateConfig('company.description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={config.contact.email}
                    onChange={(e) => updateConfig('contact.email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={config.contact.phone}
                    onChange={(e) => updateConfig('contact.phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Address</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street
                    </label>
                    <input
                      type="text"
                      value={config.contact.address.street}
                      onChange={(e) => updateConfig('contact.address.street', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={config.contact.address.city}
                      onChange={(e) => updateConfig('contact.address.city', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      value={config.contact.address.state}
                      onChange={(e) => updateConfig('contact.address.state', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={config.contact.address.zip}
                      onChange={(e) => updateConfig('contact.address.zip', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weekdays
                    </label>
                    <input
                      type="text"
                      value={config.contact.hours.weekdays}
                      onChange={(e) => updateConfig('contact.hours.weekdays', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Saturday
                    </label>
                    <input
                      type="text"
                      value={config.contact.hours.saturday}
                      onChange={(e) => updateConfig('contact.hours.saturday', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sunday
                    </label>
                    <input
                      type="text"
                      value={config.contact.hours.sunday}
                      onChange={(e) => updateConfig('contact.hours.sunday', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'homepage' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Homepage Content</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Title
                </label>
                <input
                  type="text"
                  value={config.homepage.heroTitle}
                  onChange={(e) => updateConfig('homepage.heroTitle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Subtitle
                </label>
                <textarea
                  value={config.homepage.heroSubtitle}
                  onChange={(e) => updateConfig('homepage.heroSubtitle', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CTA Button Text
                </label>
                <input
                  type="text"
                  value={config.homepage.ctaText}
                  onChange={(e) => updateConfig('homepage.ctaText', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Features</h3>
                {config.homepage.features.map((feature, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Icon (emoji)
                        </label>
                        <input
                          type="text"
                          value={feature.icon}
                          onChange={(e) => {
                            const newFeatures = [...config.homepage.features]
                            newFeatures[index].icon = e.target.value
                            setConfig(prev => ({ ...prev, homepage: { ...prev.homepage, features: newFeatures } }))
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={feature.title}
                          onChange={(e) => {
                            const newFeatures = [...config.homepage.features]
                            newFeatures[index].title = e.target.value
                            setConfig(prev => ({ ...prev, homepage: { ...prev.homepage, features: newFeatures } }))
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={feature.description}
                          onChange={(e) => {
                            const newFeatures = [...config.homepage.features]
                            newFeatures[index].description = e.target.value
                            setConfig(prev => ({ ...prev, homepage: { ...prev.homepage, features: newFeatures } }))
                          }}
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Services</h2>
              
              {config.services.map((service, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Icon (emoji)
                        </label>
                        <input
                          type="text"
                          value={service.icon}
                          onChange={(e) => {
                            const newServices = [...config.services]
                            newServices[index].icon = e.target.value
                            setConfig(prev => ({ ...prev, services: newServices }))
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => {
                            const newServices = [...config.services]
                            newServices[index].title = e.target.value
                            setConfig(prev => ({ ...prev, services: newServices }))
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={service.description}
                          onChange={(e) => {
                            const newServices = [...config.services]
                            newServices[index].description = e.target.value
                            setConfig(prev => ({ ...prev, services: newServices }))
                          }}
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Features (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={service.features.join(', ')}
                        onChange={(e) => {
                          const newServices = [...config.services]
                          newServices[index].features = e.target.value.split(',').map(f => f.trim()).filter(f => f)
                          setConfig(prev => ({ ...prev, services: newServices }))
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">About Page Content</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mission Statement
                </label>
                <textarea
                  value={config.about.mission}
                  onChange={(e) => updateConfig('about.mission', e.target.value)}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Values (one per line)
                </label>
                <textarea
                  value={config.about.values.join('\n')}
                  onChange={(e) => updateConfig('about.values', e.target.value.split('\n').filter(v => v.trim()))}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Team Members</h3>
                {config.about.team.map((member, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => {
                            const newTeam = [...config.about.team]
                            newTeam[index].name = e.target.value
                            setConfig(prev => ({ ...prev, about: { ...prev.about, team: newTeam } }))
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Role
                        </label>
                        <input
                          type="text"
                          value={member.role}
                          onChange={(e) => {
                            const newTeam = [...config.about.team]
                            newTeam[index].role = e.target.value
                            setConfig(prev => ({ ...prev, about: { ...prev.about, team: newTeam } }))
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bio
                        </label>
                        <textarea
                          value={member.bio}
                          onChange={(e) => {
                            const newTeam = [...config.about.team]
                            newTeam[index].bio = e.target.value
                            setConfig(prev => ({ ...prev, about: { ...prev.about, team: newTeam } }))
                          }}
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Statistics</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Happy Clients
                    </label>
                    <input
                      type="text"
                      value={config.about.stats.clients}
                      onChange={(e) => updateConfig('about.stats.clients', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years Experience
                    </label>
                    <input
                      type="text"
                      value={config.about.stats.years}
                      onChange={(e) => updateConfig('about.stats.years', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Team Members
                    </label>
                    <input
                      type="text"
                      value={config.about.stats.team}
                      onChange={(e) => updateConfig('about.stats.team', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

