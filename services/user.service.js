import axios from 'axios'

const BASE_URL = '/api/user/'

export const userService = {
  query,
  getById,
  remove,
  getUserBugs,
  getEmptyCredentials,
}

// Get all users
async function query() {
  try {
    const { data } = await axios.get(BASE_URL)
    return data
  } catch (err) {
    console.error('Failed to load users:', err)
    throw err
  }
}

// Get a single user by ID
async function getById(userId) {
  try {
    const { data } = await axios.get(BASE_URL + userId)
    return data
  } catch (err) {
    console.error(`Failed to load user ${userId}:`, err)
    throw err
  }
}

// Remove a user
async function remove(userId) {
  try {
    const { data } = await axios.delete(BASE_URL + userId)
    return data
  } catch (err) {
    console.error(`Error removing user ${userId}:`, err)
    throw err
  }
}

// Get bugs created by a specific user
async function getUserBugs(userId) {
  try {
    const { data } = await axios.get(`${BASE_URL}${userId}/bugs`)
    return data
  } catch (err) {
    console.error(`Failed to load bugs for user ${userId}:`, err)
    throw err
  }
}

// Empty credentials for login/signup forms
function getEmptyCredentials() {
  return {
    username: '',
    password: '',
    fullname: '',
  }
}
