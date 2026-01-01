import { useSelector } from "react-redux"
import { loadReviews } from "../../store/review.actions.js"
import { useEffect } from "react"

export function ReviewExplore() {

    useEffect(() => {
        loadReviews()
    }, [])

    const reviews = useSelector(state => state.reviews)
    if (!reviews) return <div>Loading...</div>

    return (
        <section className="review-explore">

            <h2 className="title">All Reviews</h2>

            {reviews.length === 0 && (
                <p className="no-reviews">No reviews yet.</p>
            )}

            <ul className="review-list">
                {reviews.map(review => (
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
                                        Written by <span>{review.byUser.fullname}</span>
                                    </p>
                                    <h3 className="toy-name">{review.toy.name}</h3>
                                </div>
                            </div>

                            <div className="review-body">
                                <p className="toy-price">
                                    <strong>Price:</strong> <span>${review.toy.price}</span>
                                </p>

                                <p className="review-text">
                                    <strong>Review:</strong> <span>{review.txt}</span> 
                                </p>
                            </div>

                        </div>

                    </li>
                ))}
            </ul>

        </section>
    )
}
