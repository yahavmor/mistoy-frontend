import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const TOY_KEY = 'toyDB'
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
'Outdoor', 'Battery Powered']
_createToys()

export const toyService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getFilterFromSearchParams,
}
window.cs = toyService

function query(filterBy = {}) {
    return storageService.query(TOY_KEY)
        // .then(toys => {
        //     if (filterBy.txt) {
        //         const regExp = new RegExp(filterBy.txt, 'i')
        //         todos = todos.filter(toy => regExp.test(toy.txt))
        //     }
        //     if (filterBy.importance) {
        //         todos = todos.filter(todo => todo.importance >= filterBy.importance)
        //     }
        //     if (filterBy.state && filterBy.state !== 'all') {
        //         if (filterBy.state === 'active') {
        //             todos = todos.filter(todo => !todo.isDone)
        //         } else if (filterBy.state === 'done') {
        //             todos = todos.filter(todo => todo.isDone)
        //         }
        //     }
        //     return todos
        // })
}

function get(toyId) {
    return storageService.get(TOY_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        toy.updatedAt = Date.now()
        return storageService.put(TOY_KEY, toy)
    } else {
        toy.createdAt = toy.updatedAt = Date.now()

        return storageService.post(TOY_KEY, toy)
    }
}



function getDefaultFilter() {
    return { txt: '', importance: 0 }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}


function _createToys() {
    console.log('df')
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
        const names = ['Lily', 'Daisy', 'Rosie', 'Bella', 'Sophie', 'Mia', 'Zoey', 'Stella', 'Luna', 'Aurora']
        for (let i = 0; i < 20; i++) {
            const name = names[utilService.getRandomIntInclusive(0, names.length - 1)]
            toys.push(_createToy(name))
        }
        utilService.saveToStorage(TOY_KEY, toys)
    }
}


function _createToy(name) {
    const toy = {}
    toy.name = name
    toy.imgUrl = 'hardcoded-url-for-now'
    toy._id = utilService.makeId()
    toy.createdAt = toy.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    toy.price = utilService.getRandomIntInclusive(50, 400)
    toy.labels = [...labels]
    .sort(() => Math.random() - 0.5)
    .slice(0, utilService.getRandomIntInclusive(1, 3))
    toy.inStock = utilService.getRandomIntInclusive(0, 1) ? true : false
    return toy
}


