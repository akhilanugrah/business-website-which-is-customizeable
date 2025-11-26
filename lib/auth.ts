// Authentication utilities

export interface AdminUser {
  username: string
  passwordHash: string
  email: string
  phone: string
  createdAt: string
}

// Hash password using Web Crypto API
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}

// Check if admin account exists
export function adminExists(): boolean {
  if (typeof window === 'undefined') return false
  const admin = localStorage.getItem('adminUser')
  return admin !== null
}

// Get admin user
export function getAdminUser(): AdminUser | null {
  if (typeof window === 'undefined') return null
  const admin = localStorage.getItem('adminUser')
  if (!admin) return null
  try {
    return JSON.parse(admin)
  } catch {
    return null
  }
}

// Create admin account
export async function createAdmin(
  username: string,
  password: string,
  email: string,
  phone: string
): Promise<void> {
  if (adminExists()) {
    throw new Error('Admin account already exists')
  }

  const passwordHash = await hashPassword(password)
  const admin: AdminUser = {
    username,
    passwordHash,
    email,
    phone,
    createdAt: new Date().toISOString()
  }

  localStorage.setItem('adminUser', JSON.stringify(admin))
}

// Login
export async function login(username: string, password: string): Promise<boolean> {
  const admin = getAdminUser()
  if (!admin) return false

  if (admin.username !== username) return false

  const isValid = await verifyPassword(password, admin.passwordHash)
  if (isValid) {
    localStorage.setItem('adminAuthenticated', 'true')
    localStorage.setItem('adminSessionTime', Date.now().toString())
    return true
  }

  return false
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  
  const authenticated = localStorage.getItem('adminAuthenticated')
  if (authenticated !== 'true') return false

  // Check session timeout (24 hours)
  const sessionTime = localStorage.getItem('adminSessionTime')
  if (!sessionTime) return false

  const timeDiff = Date.now() - parseInt(sessionTime)
  const hours24 = 24 * 60 * 60 * 1000

  if (timeDiff > hours24) {
    logout()
    return false
  }

  return true
}

// Logout
export function logout(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('adminAuthenticated')
  localStorage.removeItem('adminSessionTime')
}

// Reset password (requires email or phone verification)
export async function resetPassword(
  username: string,
  emailOrPhone: string,
  newPassword: string
): Promise<boolean> {
  const admin = getAdminUser()
  if (!admin) return false

  if (admin.username !== username) return false

  // Verify email or phone matches
  if (admin.email !== emailOrPhone && admin.phone !== emailOrPhone) {
    return false
  }

  // Update password
  const passwordHash = await hashPassword(newPassword)
  admin.passwordHash = passwordHash
  localStorage.setItem('adminUser', JSON.stringify(admin))

  return true
}

// Update admin info
export async function updateAdminInfo(email: string, phone: string): Promise<void> {
  const admin = getAdminUser()
  if (!admin) throw new Error('Admin not found')

  admin.email = email
  admin.phone = phone
  localStorage.setItem('adminUser', JSON.stringify(admin))
}

