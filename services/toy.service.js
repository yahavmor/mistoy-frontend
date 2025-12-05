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
    getEmptyToy
}
function query(filterBy = {}) {
    return storageService.query(TOY_KEY)
        .then(toys => {
            if (filterBy.name) {
                const regExp = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }
            if (filterBy.price) {
                toys = toys.filter(toy => toy.price >= filterBy.price)
            }
            if (filterBy.inStock) {
                toys = toys.filter(toy => toy.inStock)
            }
            if (filterBy.labels && filterBy.labels.length) {
                toys = toys.filter(toy =>
                    toy.labels.some(label => filterBy.labels.includes(label))
                )
            }
            return toys
        })
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
    return { name: '', price: 0, labels: [],  inStock: false }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        if (field === 'labels') {
            filterBy.labels = searchParams.getAll('labels') || []
        } else if (field === 'price') {
            filterBy.price = +searchParams.get(field) || 0
        } else if (field === 'inStock') {
            filterBy.inStock = searchParams.get(field) === true
        } else {
            filterBy[field] = searchParams.get(field) || ''
        }
    }
    return filterBy
}



function _createToys() {
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
    toy.imgUrl = `https://robohash.org/${name}?size=200x200`
    toy._id = utilService.makeId()
    toy.createdAt = toy.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    toy.price = utilService.getRandomIntInclusive(50, 400)
    toy.labels = [...labels]
    .sort(() => Math.random() - 0.5)
    .slice(0, utilService.getRandomIntInclusive(1, 3))
    toy.inStock = utilService.getRandomIntInclusive(0, 1) ? true : false
    return toy
}
function getEmptyToy() {
    return {
        name: '',
        price: 0,
        inStock: false,
        labels: utilService.getRandLabels(utilService.getRandomIntInclusive(1, 3)),
        imgUrl: `https://robohash.org/${utilService.getRandAnswer()}?size=200x200`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    }
}


