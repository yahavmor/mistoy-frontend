import { useState, useEffect } from "react"
import {useNavigate,useParams} from 'react-router-dom'
import { setToy, setChat } from '../../store/toy.actions.js'
import { useSelector } from 'react-redux'
import { utilService } from "../../services/util.service.js"
import { Popup } from "../cmps/Popup.jsx"
import {showErrorMsg, showSuccessMsg} from '../../services/event-bus.service.js'
import { ToyPreview } from "../cmps/ToyPreview.jsx"
import { toyService } from "../../services/toy.service.js"
import { MessageList } from "../cmps/MessageList.jsx"






export function ToyDetails() {
    const toy = useSelector((state) => state.toy)    
    const isChatOpen = useSelector((state) => state.chat)
    const loggedinUser = useSelector((state) => state.user)
    const {toyId} = useParams()
    const navigate = useNavigate()
    const [answer,setAnswer] = useState(null)
    const [question,setQuestion] = useState("")
    const [message, setMessage] = useState("")
    const [toyMessages, setToyMessages] = useState([])

    useEffect(() => {
    async function loadToy() {
        try {
            const loadedToy = await toyService.get(toyId)   
            setToy(loadedToy._id)
            setToyMessages(loadedToy.msgs || [])            
            showSuccessMsg('Toy details loaded')
        } catch (err) {
            console.log('error is:', err)
            showErrorMsg('Cannot load toy details')
            navigate('/toy')
        }
    }
    loadToy()
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

async function onSendMessage() {
    if (!message) return

    try {
        const savedMsg = await toyService.sendMessage(toyId, message)
        setToyMessages(prev => [...prev, savedMsg])
        showSuccessMsg('Your message has been sent!')
    } catch (err) {
        console.log('Cannot send message', err)
        showErrorMsg('Cannot send message')
    }

    setMessage("")
}


function onDeleteReview(msgId) {
    async function deleteReview() {
        try {
            await toyService.deleteMessage(toyId, msgId)
            setToyMessages(prevMessages => prevMessages.filter(msg => msg.id !== msgId))
            showSuccessMsg('Message deleted successfully!')
        }
        catch(err){
            console.log('Cannot delete message', err)
            showErrorMsg('Cannot delete message')
        }
    }
    deleteReview()
}

    if (!toy) return <div>Loading...</div>
    const inStock = toy.inStock? 'in-stock': 'sold-out'
    const createdAt = utilService.timeAgo(toy.createdAt)
    return (
        <section className="toy-details">
            <ToyPreview toy={toy}/>

            {loggedinUser && <div className="message-box">
                <label className="message-label">Add Message:</label>

                <div className="message-input-row">
                    <input
                        type="text"
                        className="message-input"
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write a message..."
                        value={message}
                    />

                    <button className="send-btn" onClick={onSendMessage}>
                        Send
                    </button>
                </div>
            </div>
            }    
            <MessageList toyMessages={toyMessages} 
            onDeleteReview={onDeleteReview} 
            loggedinUser={loggedinUser}
            />

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
            <img className="chat-icon" src="chat-icon.png" alt="chat icon"  onClick={handleChat}/>

        </section>
    )
}