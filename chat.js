'use strict'

// TODO: Initialize a socket
const socket = io()

// TODO: Intercept 'chat-msg' events

socket.on('chat-msg', msg => {
    appendMsg(msg)
})

// TODO: Intercept 'chat-history' events

socket.on('chat-history', history => {
    history.forEach(appendMsg)
})

function onInit() {
    console.log('Hi')

    // TODO: Prompt user for nickname & save to session storage
    const nickname = join()

    // TODO: Emit a 'join-chat' event towards the server
    socket.emit('join-chat', nickname)

    setTopic()
}

function join() {
    var nickname = sessionStorage.nickname
    
    if (!nickname) {
        nickname = prompt('Enter nickname')
        sessionStorage.nickname = nickname
    }

    document.querySelector('.nickname').innerText = nickname
    return nickname
}

function appendMsg(msg) {
    if (msg.by === sessionStorage.nickname) msg.by = 'Me'

    // TODO: Add the incoming msg to the chat

    const elChat = document.querySelector('.chat')
    elChat.innerHTML += `<li><span>${msg.by}:</span> ${msg.txt}</li>`

    window.scrollTo(0, document.body.scrollHeight)
}

function sendMsg(ev) {
    ev.preventDefault()

    const elMsgBox = document.querySelector('.msg-box')
    const msg = {
        by: sessionStorage.nickname,
        txt: elMsgBox.value,
    }

    // TODO: Emit a 'chat-msg' event towards the server
    socket.emit('chat-msg', msg)

    elMsgBox.value = ''
}

function setTopic() {
    // TODO: Emit a 'join-topic' event towards the server

    const topic = document.querySelector('.topic').value
    socket.emit('join-topic', topic)
    
    document.querySelector('.chat').innerHTML = ''
    document.querySelector('.msg-box').focus()
}