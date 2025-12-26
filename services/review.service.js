// review.service.js — FRONTEND

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/review'
    : 'http://localhost:3030/api/review'

export const reviewService = {
    query,
    add,
    remove
}

// שליפת ביקורות (עם פילטרים: toyId או userId)
async function query(filterBy = {}) {
    const queryParams = new URLSearchParams()

    if (filterBy.toyId) queryParams.set('toyId', filterBy.toyId)
    if (filterBy.userId) queryParams.set('userId', filterBy.userId)

    const res = await fetch(`${BASE_URL}?${queryParams.toString()}`)
    if (!res.ok) throw new Error('Failed to fetch reviews')
    return res.json()
}

// הוספת ביקורת חדשה
async function add(review) {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })

    if (!res.ok) throw new Error('Failed to add review')
    return res.json()
}

// מחיקת ביקורת
async function remove(reviewId) {
    const res = await fetch(`${BASE_URL}/${reviewId}`, {
        method: 'DELETE'
    })

    if (!res.ok) throw new Error('Failed to delete review')
    return res.text()
}
