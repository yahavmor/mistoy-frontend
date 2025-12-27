const BASE_URL = 'https://mister-backend.onrender.com/api/user/'

export const userService = {
  query,
  getById,
  remove,
  getUserBugs,
  getEmptyCredentials,
}

async function query() {
  try {
    const res = await fetch(BASE_URL)
    if (!res.ok) throw new Error('Failed to load users')
    return await res.json()
  } catch (err) {
    console.error('Failed to load users:', err)
    throw err
  }
}

async function getById(userId) {
  try {
    const res = await fetch(BASE_URL + userId)
    if (!res.ok) throw new Error(`Failed to load user ${userId}`)
    return await res.json()
  } catch (err) {
    console.error(`Failed to load user ${userId}:`, err)
    throw err
  }
}

async function remove(userId) {
  try {
    const res = await fetch(BASE_URL + userId, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error(`Failed to remove user ${userId}`)
    return await res.json()
  } catch (err) {
    console.error(`Error removing user ${userId}:`, err)
    throw err
  }
}

async function getUserBugs(userId) {
  try {
    const res = await fetch(`${BASE_URL}${userId}/bugs`)
    if (!res.ok) throw new Error(`Failed to load bugs for user ${userId}`)
    return await res.json()
  } catch (err) {
    console.error(`Failed to load bugs for user ${userId}:`, err)
    throw err
  }
}

function getEmptyCredentials() {
  return {
    username: '',
    password: '',
    fullname: '',
  }
}
