import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import { toyService } from "../../services/toy.service.js"
import { reviewService } from "../../services/review.service.js"

import { setToy } from "../../store/toy.actions.js"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service.js"

import { ToyPreview } from "../cmps/ToyPreview.jsx"
import { MessageList } from "../cmps/MessageList.jsx"


export function ToyDetails() {

    const toy = useSelector(state => state.toy)
    const loggedinUser = useSelector(state => state.user)

    const { toyId } = useParams()
    const navigate = useNavigate()

    const [text, setText] = useState("")        
    const [toyMessages, setToyMessages] = useState([])
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        loadToy()
    }, [toyId])

    async function loadToy() {
        try {
            const loadedToy = await toyService.get(toyId)
            setToy(loadedToy._id)

            setToyMessages(loadedToy.msgs || [])

            const toyReviews = await reviewService.query({ toyId })
            setReviews(toyReviews)

            showSuccessMsg("Toy details loaded")
        } catch (err) {
            console.log("Cannot load toy", err)
            showErrorMsg("Cannot load toy details")
            navigate("/toy")
        }
    }



    async function onSend() {
        if (!text) return

        try {
            const savedMsg = await toyService.sendMessage(toyId, text)
            setToyMessages(prev => [...prev, savedMsg])

            await reviewService.add({
                txt: text,
                toyId,
                userId: loggedinUser._id
            })

            showSuccessMsg("Message added!")
        } catch (err) {
            console.log("Cannot send", err)
            showErrorMsg("Cannot send message")
        }

        setText("")
    }

    async function onDeleteMessage(msgId) {
        try {
            await toyService.deleteMessage(toyId, msgId)
            setToyMessages(prev => prev.filter(msg => msg.id !== msgId))
            showSuccessMsg("Message deleted")
        } catch (err) {
            console.log("Cannot delete message", err)
            showErrorMsg("Cannot delete message")
        }
    }

    if (!toy) return <div>Loading...</div>

    return (
        <section className="toy-details">

            <ToyPreview toy={toy} />

            {loggedinUser && (
                <div className="message-box">
                    <input
                        type="text"
                        placeholder="Write a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button onClick={onSend}>Send</button>
                </div>
            )}

            <section className="messages-section">
                <MessageList
                    toyMessages={toyMessages}
                    onDeleteReview={onDeleteMessage}
                    loggedinUser={loggedinUser}
                />
            </section>
            <button className="btn-back" onClick={() => navigate("/toy")}>
                Back to list
            </button>

        </section>
    )
}
