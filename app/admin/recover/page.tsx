'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getAdminUser, resetPassword, adminExists } from '@/lib/auth'

export default function RecoverPage() {
  const router = useRouter()
  const [step, setStep] = useState<'verify' | 'reset'>('verify')
  const [formData, setFormData] = useState({
    username: '',
    emailOrPhone: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [adminInfo, setAdminInfo] = useState<{ email: string; phone: string } | null>(null)

  useEffect(() => {
    if (!adminExists()) {
      router.push('/setup')
    }
  }, [router])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const admin = getAdminUser()
      if (!admin) {
        setError('Admin account not found')
        return
      }

      if (admin.username !== formData.username) {
        setError('Username not found')
        return
      }

      // Check if email or phone matches (partial match for privacy)
      const emailMatch = admin.email.toLowerCase() === formData.emailOrPhone.toLowerCase()
      const phoneMatch = admin.phone.replace(/\D/g, '') === formData.emailOrPhone.replace(/\D/g, '')

      if (!emailMatch && !phoneMatch) {
        setError('Email or phone does not match our records')
        return
      }

      // Show masked email/phone for confirmation
      setAdminInfo({
        email: maskEmail(admin.email),
        phone: maskPhone(admin.phone)
      })
      setStep('reset')
    } catch (err: any) {
      setError(err.message || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const success = await resetPassword(
        formData.username,
        formData.emailOrPhone,
        formData.newPassword
      )

      if (success) {
        router.push('/admin/login?reset=success')
      } else {
        setError('Failed to reset password')
      }
    } catch (err: any) {
      setError(err.message || 'Password reset failed')
    } finally {
      setLoading(false)
    }
  }

  const maskEmail = (email: string): string => {
    const [local, domain] = email.split('@')
    if (local.length <= 2) return email
    return `${local[0]}${'*'.repeat(local.length - 2)}${local[local.length - 1]}@${domain}`
  }

  const maskPhone = (phone: string): string => {
    const digits = phone.replace(/\D/g, '')
    if (digits.length <= 4) return phone
    return `***-***-${digits.slice(-4)}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (!adminExists()) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {step === 'verify' ? 'Password Recovery' : 'Reset Password'}
            </h2>
            <p className="mt-2 text-gray-600">
              {step === 'verify' 
                ? 'Verify your identity to reset your password'
                : 'Enter your new password'
              }
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {step === 'verify' ? (
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label htmlFor="emailOrPhone" className="block text-sm font-medium text-gray-700 mb-2">
                  Email or Phone
                </label>
                <input
                  id="emailOrPhone"
                  name="emailOrPhone"
                  type="text"
                  required
                  value={formData.emailOrPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your email or phone number"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enter the email or phone number you used during setup
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify Identity'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleReset} className="space-y-6">
              {adminInfo && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-green-700">
                    <strong>Verified:</strong> {adminInfo.email} or {adminInfo.phone}
                  </p>
                </div>
              )}

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="At least 6 characters"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Confirm your new password"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setStep('verify')
                    setFormData({ ...formData, newPassword: '', confirmPassword: '' })
                    setError('')
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link href="/admin/login" className="text-sm text-primary-600 hover:text-primary-700">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

