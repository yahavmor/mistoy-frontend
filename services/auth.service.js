import axios from 'axios'

const STORAGE_KEY = 'loggedInUser'

const api = axios.create({
  baseURL: '/api/auth/',
  withCredentials: true, // allow cookies (sessions)
})

export const authService = {
  login,
  signup,
  logout,
  getLoggedinUser,
}

async function login(credentials) {
  try {
    const { data: user } = await api.post('login', credentials)
    return _saveUser(user)
  } catch (err) {
    console.error('Login failed:', err.response?.data || err)
    throw err
  }
}

async function signup(credentials) {
  try {
    const { data: user } = await api.post('signup', credentials)
    return _saveUser(user)
  } catch (err) {
    console.error('Signup failed:', err.response?.data || err)
    throw err
  }
}

async function logout() {
  try {
    await api.post('logout')
    sessionStorage.removeItem(STORAGE_KEY)
  } catch (err) {
    console.error('Logout failed:', err.response?.data || err)
    throw err
  }
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY))
}

function _saveUser(user) {
  const userToStore = {
    _id: user._id ,
    fullname: user.fullname || 'Anonymous',
    isAdmin: user.isAdmin || false,
  }
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userToStore))
  return userToStore
}
