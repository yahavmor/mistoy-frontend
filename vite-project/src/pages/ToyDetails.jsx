import { toyService } from "../services/toy.service.js"
import { useState, useEffect } from "react"
import {useParsms, useNavigate, Link} from 'react-router-dom'

export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [params.todoId])


    function loadToy() {
        toyService.get(params.toyId)
            .then(setToy)
            .catch(err => {
                console.error('err:', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    function onBack() {
        // If nothing to do here, better use a Link
        navigate('/toy')
        // navigate(-1)
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Toy : {toy.name}</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim rem accusantium, itaque ut voluptates quo? Vitae animi maiores nisi, assumenda molestias odit provident quaerat accusamus, reprehenderit impedit, possimus est ad?</p>
            <button onClick={onBack}>Back to list</button>
        </section>
    )
}