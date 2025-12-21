import { ToyPreview } from "../cmps/ToyPreview.jsx"
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'


export function ToyList({ toys, onRemoveToy }) {
    const loggedinUser = useSelector((state) => state.user)

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview toy={toy} />
                    <section>
                        {loggedinUser?.isAdmin && <button onClick={() => onRemoveToy(toy._id)}>Remove</button>}
                        <button>
                            <Link to={`/toy/${toy._id}`}>Details</Link>
                        </button>
                        <button>
                        {loggedinUser?.isAdmin && <Link to={`/toy/edit/${toy._id}`}>Edit</Link>}
                        </button>
                    </section>
                </li>
            )}
        </ul>
    )
}
