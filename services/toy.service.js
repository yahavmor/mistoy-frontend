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
    labels
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


