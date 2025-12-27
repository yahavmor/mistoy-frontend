const STORAGE_KEY = 'loggedInUser'

const BASE_URL = 'https://mister-backend.onrender.com/api/auth/'

export const authService = {
  login,
  signup,
  logout,
  getLoggedinUser,
}

async function login(credentials) {
  try {
    const res = await fetch(BASE_URL + 'login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })

    if (!res.ok) throw await _handleError(res)

    const user = await res.json()
    return _saveUser(user)
  } catch (err) {
    console.error('Login failed:', err)
    throw err
  }
}

async function signup(credentials) {
  try {
    const res = await fetch(BASE_URL + 'signup', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })

    if (!res.ok) throw await _handleError(res)

    const user = await res.json()
    return _saveUser(user)
  } catch (err) {
    console.error('Signup failed:', err)
    throw err
  }
}

async function logout() {
  try {
    const res = await fetch(BASE_URL + 'logout', {
      method: 'POST',
      credentials: 'include',
    })

    if (!res.ok) throw await _handleError(res)

    sessionStorage.removeItem(STORAGE_KEY)
  } catch (err) {
    console.error('Logout failed:', err)
    throw err
  }
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY))
}

function _saveUser(user) {
  const userToStore = {
    _id: user._id,
    fullname: user.fullname || 'Anonymous',
    isAdmin: user.isAdmin || false,
  }
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userToStore))
  return userToStore
}

async function _handleError(res) {
  try {
    const err = await res.json()
    return err
  } catch {
    return { msg: 'Unknown error', status: res.status }
  }
}
