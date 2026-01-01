// ChatRoom.jsx
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import {
    socketService,
    SOCKET_EMIT_SEND_MSG,
    SOCKET_EVENT_ADD_MSG,
    SOCKET_EMIT_SET_TOPIC
} from '../../services/socket.service.js'

export function ChatRoom() {
    const loggedinUser = useSelector(state => state.user)

    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [topic, setTopic] = useState('general')
    const [isBotMode, setIsBotMode] = useState(false)

    const botTimeoutRef = useRef()

    // Listen to incoming messages
    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)

        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            clearTimeout(botTimeoutRef.current)
        }
    }, [])

    // Join topic
    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
    }, [topic])

    function addMsg(newMsg) {
        setMsgs(prev => [...prev, newMsg])
    }

    function sendBotResponse() {
        clearTimeout(botTimeoutRef.current)
        botTimeoutRef.current = setTimeout(() => {
            addMsg({ from: 'Bot', txt: 'You are amazing!' })
        }, 1200)
    }

    function sendMsg(ev) {
        ev.preventDefault()

        const from = loggedinUser?.fullname || 'Me'
        const newMsg = { from, txt: msg.txt }

        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)

        if (isBotMode) sendBotResponse()

        setMsg({ txt: '' })
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prev => ({ ...prev, [name]: value }))
    }

    return (
        <section className="chat">
            <h2>Chat about: {topic}</h2>

            <form onSubmit={sendMsg}>
                <input
                    type="text"
                    name="txt"
                    value={msg.txt}
                    onChange={handleFormChange}
                    autoComplete="off"
                />
                <button>Send</button>
            </form>

            <ul>
                {msgs.map((msg, idx) => (
                    <li key={idx}>
                        <strong>{msg.from}:</strong> {msg.txt}
                    </li>
                ))}
            </ul>
        </section>
    )
}
