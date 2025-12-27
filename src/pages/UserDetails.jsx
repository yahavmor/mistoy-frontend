import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import { loadReviews } from "../../store/review.actions.js"
import { userService } from "../../services/user.service.js"

export function UserDetails() {

    const { userId } = useParams()

    const reviews = useSelector(state => state.reviews)
    const userReviews = reviews.filter(review => review.byUser._id === userId)
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        loadUser()
        loadReviews({ userId })  
    }, [userId])

    async function loadUser() {
        try {
            const user = await userService.getById(userId)
            setUser(user)
            setError(null)
        } catch (err) {
            console.error('Failed to load user:', err)
            setUser(null)
            setError('User not found')
        }
    }

    if (error) return <div>{error}</div>
    if (!user) return <div>Loading...</div>

    return (
    <section className="user-details">

        <h2 className="user-title">{user.fullname}</h2>
        <p className="user-subtitle">Your Reviews</p>

        {userReviews.length === 0 && (
            <p className="no-reviews">You haven't written any reviews yet.</p>
        )}

        <ul className="review-list">
            {userReviews.map(review => (
                <li key={review._id} className="review-item">

                    <div className="review-card">

                        <div className="review-header">
                            <img
                                src={review.toy.imgUrl}
                                alt={review.toy.name}
                                className="toy-img"
                            />

                            <div className="review-meta">
                                <p className="review-owner">
                                    You reviewed <span>{review.toy.name}</span>
                                </p>
                            </div>
                        </div>

                        <div className="review-body">
                            <p className="toy-price">
                                Price: <span>${review.toy.price}</span>
                            </p>

                            <p className="review-text">
                                Review: <span>{review.txt}</span>
                            </p>
                        </div>

                    </div>

                </li>
            ))}
        </ul>

    </section>

    )
}
