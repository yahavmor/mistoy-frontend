import { useState, useEffect } from "react"
import {useNavigate, Link, useParams} from 'react-router-dom'
import { setToy, setChat } from '../../store/toy.actions.js'
import { toyService } from "../../services/toy.service.js"
import { useSelector } from 'react-redux'
import { utilService } from "../../services/util.service.js"
import { Popup } from "../cmps/Popup.jsx"


export function ToyDetails() {
    const toy = useSelector((state) => state.toy)    
    const isChatOpen = useSelector((state) => state.chat)
    const {toyId} = useParams()
    const navigate = useNavigate()
    const [answer,setAnswer] = useState(null)
    const [question,setQuestion] = useState("")
    
    useEffect(() => {
        setToy(toyId)
        .catch(err => {
            console.log('error is: ',err)
        })
        
    }, [])
    function handleChat(){
    setChat(!isChatOpen)
    }

    function onBack() {
        navigate('/toy')
    }
    function handleSend() {
        if(!question) return
        setAnswer(utilService.getRandAnswer())
        setQuestion("")
}

    if (!toy) return <div>Loading...</div>
    const inStock = toy.inStock? 'In stock': 'Sold out'
    const createdAt = utilService.timeAgo(toy.createdAt)
    return (
        <section className="toy-details">
            <h1 className="toy-name">Toy :{toy.name}</h1>
            <img className="toy-image" src={toy.imgUrl} alt="image of the toy" />
            <h2 className="toy-price">Price:{toy.price}</h2>
            <h3 className="in-stock">{inStock}</h3>
            <p className="created-at">This toy has been created at : {createdAt}</p>
            <img className="chat-icon" src="chat-icon.png" alt="chat icon"  onClick={handleChat}/>
            <button className="btn-back" onClick={onBack}>Back to list</button>
            <Popup isOpen={isChatOpen} onClose={handleChat}>
                <h2>Chat with us</h2>
                <input
                type="text"
                placeholder="Write your question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend()
                }}
                />
                <button className="btn-send" disabled={!question} onClick={handleSend}>Send</button>
                {answer && <p>{answer}</p>}
            </Popup>
        </section>
    )
}