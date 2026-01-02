import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import {socketService,SOCKET_EMIT_SEND_MSG,SOCKET_EVENT_ADD_MSG,SOCKET_EMIT_SET_TOPIC} from '../../services/socket.service.js'

export function ChatRoom({ toy }) {
    const loggedinUser = useSelector(state => state.user)

    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [topic, setTopic] = useState(toy ? toy.name : 'General')

    const chatEndRef = useRef(null)

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
    }, [])

    useEffect(() => {
        socketService.on('chat-history', history => setMsgs(history))
        return () => socketService.off('chat-history')
    }, [])

    useEffect(() => {
        if (toy) setTopic(toy.name)
    }, [toy])

    useEffect(() => {
        if (topic) socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
    }, [topic])

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [msgs])

    function addMsg(newMsg) {
        setMsgs(prev => [...prev, newMsg])
    }

    function sendMsg(ev) {
        ev.preventDefault()
        if (!msg.txt.trim()) return

        const newMsg = {
            from: loggedinUser?.fullname || 'Guest',
            txt: msg.txt.trim(),
            userId: loggedinUser?._id || null
        }

        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        setMsg({ txt: '' })
    }

    function clearMsgs(ev) {
        ev.preventDefault()
        setMsgs([])

        socketService.emit('chat-clear-topic', {
            topic,
            userId: loggedinUser?._id
        })
    }

    return (
        <section className="chat-room">
            <header className="chat-room-header">
                <h2 className="chat-room-title">
                    Chat about: <span>{topic}</span>
                </h2>
            </header>

            <ul className="chat-messages">
                {msgs.map((msg, idx) => (
                    <li key={idx} className="chat-message">
                        <strong>{msg.from}:</strong> {msg.txt}
                    </li>
                ))}
                <div ref={chatEndRef} />
            </ul>

            <form className="chat-input-area" onSubmit={sendMsg}>
                <input
                    className="chat-input"
                    type="text"
                    name="txt"
                    placeholder="Type your message..."
                    value={msg.txt}
                    onChange={ev => setMsg({ txt: ev.target.value })}
                    autoComplete="off"
                />

                <div className="chat-actions">
                    <button className="chat-btn send" disabled={!msg.txt.trim()}>
                        Send
                    </button>

                    <button
                        className="chat-btn clear"
                        type="button"
                        onClick={clearMsgs}
                        disabled={!msgs.length}
                    >
                        Clear chat
                    </button>
                </div>
            </form>
        </section>
    )
}
