import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import { toyService } from "../../services/toy.service.js"
import { setToy } from "../../store/toy.actions.js"

import { loadReviews, addReview, removeReview } from "../../store/review.actions.js"

import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service.js"

import { ToyPreview } from "../cmps/ToyPreview.jsx"
import { MessageList } from "../cmps/MessageList.jsx"
import { ChatRoom } from "../cmps/ChatRoom.jsx"

export function ToyDetails() {

    const toy = useSelector(state => state.toy)
    const loggedinUser = useSelector(state => state.user)
    const reviews = useSelector(state => state.reviews)   

    const { toyId } = useParams()
    const navigate = useNavigate()

    const [text, setText] = useState("")        
    const [toyMessages, setToyMessages] = useState([])

    useEffect(() => {
        loadToy()
        loadReviews({ toyId })   
    }, [toyId])

    async function loadToy() {
        try {
            const loadedToy = await toyService.get(toyId)
            setToy(loadedToy._id)

            setToyMessages(loadedToy.msgs || [])

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
            const savedReview = await addReview({
                txt: text,
                toyId,
                userId: loggedinUser._id
            })
            

            const savedMsg = await toyService.sendMessage(toyId, {
                txt: text,
                reviewId: savedReview._id
            })
            

            savedMsg.reviewId = savedReview._id



            setToyMessages(prev => [...prev, savedMsg])
            

            showSuccessMsg("Message added!")
        } catch (err) {
            console.log("Cannot send", err)
            showErrorMsg("Cannot send message")
        }

        setText("")
    }


    async function onDeleteMessage(msg) {
        try {
            await toyService.deleteMessage(toyId, msg.id)
            await removeReview(msg.reviewId)   
            setToyMessages(prev => prev.filter(m => m.id !== msg.id))
            showSuccessMsg("Message deleted")
        } catch (err) {
            console.log("Cannot delete message", err)
            if (err.message.includes('401')) {
                showErrorMsg("Unauthorized: Please login again to delete messages")
            } else {
                showErrorMsg("Cannot delete message")
            }
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
            <ChatRoom />

            <button className="btn-back" onClick={() => navigate("/toy")}>
                Back to list
            </button>

        </section>
    )
}
