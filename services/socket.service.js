// socket.service.js
import io from 'socket.io-client'
import { userService } from './user.service.js'

export const SOCKET_EMIT_SEND_MSG = 'chat-send-msg'
export const SOCKET_EMIT_SET_TOPIC = 'chat-set-topic'
export const SOCKET_EMIT_USER_WATCH = 'user-watch'

export const SOCKET_EVENT_ADD_MSG = 'chat-add-msg'
export const SOCKET_EVENT_USER_UPDATED = 'user-updated'
export const SOCKET_EVENT_REVIEW_ADDED = 'review-added'
export const SOCKET_EVENT_REVIEW_REMOVED = 'review-removed'
export const SOCKET_EVENT_REVIEW_ABOUT_YOU = 'review-about-you'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'

const baseUrl = import.meta.env.PROD ? '' : 'http://localhost:3030'

export const socketService =
    import.meta.env.VITE_LOCAL === 'true'
        ? createDummySocketService()
        : createSocketService()

// Debugging
if (import.meta.env.DEV) window.socketService = socketService

socketService.setup()

function createSocketService() {
    let socket = null

    const socketService = {
        setup() {
            socket = io(baseUrl, { withCredentials: true })

            const user = userService.getLoggedinUser()
            if (user) this.login(user._id)
        },

        on(eventName, cb) {
            socket.on(eventName, cb)
        },

        off(eventName, cb = null) {
            if (!socket) return
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },

        emit(eventName, data) {
            socket.emit(eventName, data)
        },

        login(userId) {
            socket.emit(SOCKET_EMIT_LOGIN, userId)
        },

        logout() {
            socket.emit(SOCKET_EMIT_LOGOUT)
        },

        terminate() {
            socket = null
        }
    }

    return socketService
}

function createDummySocketService() {
    let listenersMap = {}

    return {
        setup() {
            listenersMap = {}
        },

        on(eventName, cb) {
            listenersMap[eventName] = [...(listenersMap[eventName] || []), cb]
        },

        off(eventName, cb) {
            if (!listenersMap[eventName]) return
            if (!cb) delete listenersMap[eventName]
            else listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
        },

        emit(eventName, data) {
            let listeners = listenersMap[eventName]

            if (eventName === SOCKET_EMIT_SEND_MSG) {
                listeners = listenersMap[SOCKET_EVENT_ADD_MSG]
            }

            if (!listeners) return
            listeners.forEach(listener => listener(data))
        },

        login() {
            console.log('Dummy socket login')
        },

        logout() {
            console.log('Dummy socket logout')
        }
    }
}
