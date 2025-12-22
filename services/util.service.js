export const utilService = {
    makeLorem,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    animateCSS,
    getRandomColor,
    timeAgo,
    getRandAnswer,
    getRandLabels,
    debounce,
    makeId
    
}
function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}


function makeLorem(size = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color' ,'of nature', 'tuned', 'to', 'a live channel', 'All', 'this happened', 'more or less', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)]
        if (size >= 1 ) txt += ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min 
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function animateCSS(el, animation='bounce') {
    const prefix = 'animate__'
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`
        el.classList.add(`${prefix}animated`, animationName)
        function handleAnimationEnd(event) {
            event.stopPropagation()
            el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }

        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}
function getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}
function timeAgo(timestamp) {
    const now = Date.now()
    const diff = now - timestamp
  
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
  
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`
}

function getRandAnswer() {
    const answers = [
      "That's an interesting thought!",
      "Can you tell me more about that?",
      "I see what you mean.",
      "Let me think about it for a moment...",
      "That's a great question!",
      "I’m not sure, but I’d love to explore it with you.",
      "It depends — what do you think?",
      "I can give you some ideas if you'd like.",
      "That reminds me of something similar I’ve seen.",
      "I’d be happy to explain further!",
      "That's a fascinating angle!",
      "I hadn’t thought of it that way before.",
      "What made you think of that?",
      "I’m curious where you're going with this.",
      "That’s a really thoughtful point.",
      "Let’s dig into that together.",
      "I like the way you're approaching this.",
      "There’s definitely something interesting there.",
      "I can see why you'd say that.",
      "That opens up a lot of possibilities.",
      "I’d love to hear your reasoning.",
      "That’s a clever observation.",
      "You’re bringing up something important.",
      "Let’s explore that idea a bit more.",
      "I appreciate the way you’re thinking about this.",
      "That could lead us somewhere really cool.",
      "You’re onto something intriguing.",
      "That’s a perspective worth considering.",
      "I’m following — keep going.",
      "That’s a solid point to start from.",
      "I can help you break that down if you want.",
      "Interesting — what made you think of that?",
      "There’s more to unpack there for sure.",
      "I like where this conversation is heading.",
      "That’s a unique way to look at it.",
      "You’re raising a great question.",
      "Let’s take a closer look at that.",
      "I’m excited to explore that with you.",
      "That’s definitely worth thinking about.",
      "I’m here if you want to dive deeper."
    ]
  
    const randomIndex = Math.floor(Math.random() * answers.length)
    return answers[randomIndex]
  }
  function getRandLabels(numberOfLabels) {
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
    const shuffled = labels.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, numberOfLabels)
  }
  function debounce(func, delay) {
    let timer;
    return (...args) =>{
      if(timer) clearTimeout(timer); 
      timer = setTimeout(()=>func(...args),delay)
    };
  }
  
  