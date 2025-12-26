export const reviewService = {
    query,
    add,
    remove
}

async function query(filterBy = {}) {
    const queryParams = new URLSearchParams()
    const res = await fetch(`/api/review?${queryParams.toString()}`)
    if (!res.ok) throw new Error('Failed to fetch reviews')
    return res.json()
}

async function add(review) {
    const res = await fetch(`/api/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })

    if (!res.ok) throw new Error('Failed to add review')
    return res.json()
}

async function remove(reviewId) {

    const res = await fetch(`/api/review/${reviewId}`, {
        method: 'DELETE'
    })

    if (!res.ok) throw new Error('Failed to delete review')
    return res.text()
}
