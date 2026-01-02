import io from 'socket.io-client'
import { userService } from './user.service.js'

export const SOCKET_EMIT_SEND_MSG = 'chat-send-msg'
export const SOCKET_EMIT_SET_TOPIC = 'chat-set-topic'

export const SOCKET_EVENT_ADD_MSG = 'chat-add-msg'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'

const baseUrl = import.meta.env.PROD ? '' : 'http://localhost:3030'

export const socketService = createSocketService()

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
