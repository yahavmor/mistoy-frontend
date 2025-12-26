import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import { loadReviews } from "../../store/review.actions.js"
import { userService } from "../../services/user.service.js"

export function UserDetails() {

    const { userId } = useParams()

    const reviews = useSelector(state => state.reviews)

    const [user, setUser] = useState(null)

    useEffect(() => {
        loadUser()
        loadReviews({ userId })  
    }, [userId])

    async function loadUser() {
        const user = await userService.getById(userId)
        setUser(user)
    }

    if (!user) return <div>Loading...</div>

    return (
        <section className="user-details">

            <h2>{user.fullname}</h2>
            <h3>Reviews by {user.fullname}</h3>
            

            {reviews.length === 0 && <p>No reviews yet.</p>}

            <ul className="review-list">
                {reviews.map(review => (
                    <li key={review._id} className="review-item">
                        <div className="toy-info">
                            <img
                                src={review.toy.imgUrl}
                                alt={review.toy.name}
                                className="toy-img"
                            />
                            <p><strong>Toy:</strong> {review.toy.name}</p>
                            <p><strong>Price:</strong> {review.toy.price}$</p>
                            <p><strong>Review:</strong> {review.txt}</p>
                        </div>
                    </li>
                ))}
            </ul>

        </section>
    )
}
