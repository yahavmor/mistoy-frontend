import { store } from './store'
import { reviewService } from '../services/review.service.js'

export async function loadReviews(filterBy = {}) {
    const reviews = await reviewService.query(filterBy)
    store.dispatch({ type: 'SET_REVIEWS', reviews })
}

export async function addReview(review) {
    const savedReview = await reviewService.add(review)
    store.dispatch({ type: 'ADD_REVIEW', review: savedReview })
    return savedReview
}

export async function removeReview(reviewId) {
    await reviewService.remove(reviewId)
    store.dispatch({ type: 'REMOVE_REVIEW', reviewId })
}
