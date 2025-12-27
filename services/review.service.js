const BASE_URL = 'https://mister-backend.onrender.com/api/review'

export const reviewService = {
  query,
  add,
  remove
}

async function query(filterBy = {}) {
  const queryParams = new URLSearchParams()

  const res = await fetch(`${BASE_URL}?${queryParams.toString()}`, {
    credentials: 'include'
  })

  if (!res.ok) throw new Error('Failed to fetch reviews')
  return res.json()
}

async function add(review) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    credentials: 'include', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  })

  if (!res.ok) throw new Error('Failed to add review')
  return res.json()
}

async function remove(reviewId) {
  const res = await fetch(`${BASE_URL}/${reviewId}`, {
    method: 'DELETE',
    credentials: 'include' 
  })

  if (!res.ok) throw new Error('Failed to delete review')
  return res.text()
}
