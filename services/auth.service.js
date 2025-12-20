import axios from 'axios'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'
const BASE_URL = '/api/auth/'

export const authService = {
  login,
  signup,
  logout,
  getLoggedinUser,
}

async function login({ username, password }) {
  try {
    const { data: user } = await axios.post(BASE_URL + 'login', { username, password })
    return _setLoggedinUser(user)
  } catch (err) {
    console.error('Login failed:', err)
    throw err
  }
}

async function signup({ username, password, fullname }) {
  try {
    const { data: user } = await axios.post(BASE_URL + 'signup', { username, password, fullname })
    return _setLoggedinUser(user)
  } catch (err) {
    console.error('Signup failed:', err)
    throw err
  }
}

async function logout() {
  try {
    await axios.post(BASE_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  } catch (err) {
    console.error('Logout failed:', err)
    throw err
  }
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _setLoggedinUser(user) {
  const { _id, fullname, isAdmin } = user
  const userToSave = { _id, fullname, isAdmin }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
  return userToSave
}
