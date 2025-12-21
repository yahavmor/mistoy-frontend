import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'


const TOY_KEY = 'toyDB'
export const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
'Outdoor', 'Battery Powered']

export const toyService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getFilterFromSearchParams,
    getEmptyToy,
    labels,
    _createToys,
    _createToy
}
export async function query(filterBy = {}) {
    const queryParams = new URLSearchParams()

    if (filterBy.txt) queryParams.set('txt', filterBy.txt)

    const res = await fetch(`/api/toy?${queryParams.toString()}`)
    if (!res.ok) throw new Error('Failed to fetch toys')

    return res.json()
}

  


async function get(toyId) {
    const res = await fetch(`/api/toy/${toyId}`)
    if (!res.ok) throw new Error('Failed to get toy')
    return res.json()
}


async function remove(toyId) {
    const res = await fetch(`/api/toy/${toyId}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to remove toy')
    return res.text()
}


async function save(toy) {
    const method = toy._id ? 'PUT' : 'POST'
    const url = toy._id ? `/api/toy/${toy._id}` : `/api/toy`

    const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toy)
    })

    if (!res.ok) throw new Error('Failed to save toy')
    return res.json()
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

function getEmptyToy() {
    const newToy =  _createToy(name='Default name')
    newToy._id = null
    return newToy
}

function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
        const names = [
            "Ravenclaw",
            "Bloodfang",
            "Nightshade",
            "Grimhollow",
            "Venomira",
            "Skullcrusher",
            "Hexbane",
            "Cinderfiend",
            "Rotfang",
            "Phantomora",
            "Ghoulspire",
            "Dreadmire",
            "Shadowfang",
            "Cryptbane",
            "Boneveil",
            "Wraithclaw",
            "Darkthorn",
            "Soulreaper",
            "Ashfang",
            "Hollowfang"
          ]
            const available = [...names]

        for (let i = 0; i < 20; i++) {
            const idx = utilService.getRandomIntInclusive(0, available.length - 1)
            const name = available.splice(idx, 1)[0]  
            toys.push(_createToy(name))
        }
        utilService.saveToStorage(TOY_KEY, toys)
    }
}


function _createToy(name) {
    const toy = {}
    toy.name = name
    toy.imgUrl = `https://robohash.org/${storageService._makeId()}?size=200x200&set=set2`
    toy._id = storageService._makeId()
    toy.createdAt = toy.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    toy.price = utilService.getRandomIntInclusive(50, 400)
    toy.labels = [...labels]
    .sort(() => Math.random() - 0.5)
    .slice(0, utilService.getRandomIntInclusive(1, 3))
    toy.inStock = utilService.getRandomIntInclusive(0, 1) ? true : false
    return toy
}
