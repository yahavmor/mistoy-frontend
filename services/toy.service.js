import axios from 'axios'
import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const TOY_KEY = 'toyDB'

export const labels = [
  'On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
  'Outdoor', 'Battery Powered'
]

const BASE_URL = 'https://mister-backend.onrender.com/api/toy'

axios.defaults.withCredentials = true

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
  _createToy,
  sendMessage,
  deleteMessage
}

async function query(filterBy = {}) {
  const params = {}

  if (filterBy.name) params.name = filterBy.name
  if (filterBy.price !== undefined) params.price = filterBy.price
  if (filterBy.inStock !== undefined) params.inStock = filterBy.inStock

  if (filterBy.labels?.length) {
    params.labels = filterBy.labels.join(',')
  }

  const { data } = await axios.get(BASE_URL, { params })
  return data
}


async function get(toyId) {
  const { data } = await axios.get(`${BASE_URL}/${toyId}`)
  return data
}

async function remove(toyId) {
  const { data } = await axios.delete(`${BASE_URL}/${toyId}`)
  return data
}

async function save(toy) {
  if (toy._id) {
    const { data } = await axios.put(`${BASE_URL}/${toy._id}`, toy)
    return data
  } else {
    const { data } = await axios.post(BASE_URL, toy)
    return data
  }
}

async function sendMessage(toyId, msg) {
  const { data } = await axios.post(`${BASE_URL}/${toyId}/msg`, msg)
  return data
}

async function deleteMessage(toyId, messageId) {
  const { data } = await axios.delete(`${BASE_URL}/${toyId}/msg/${messageId}`)
  return data
}

function getDefaultFilter() {
  return { name: '', price: 0, labels: [], inStock: false }
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
      filterBy.inStock = searchParams.get(field) === 'true'
    } else {
      filterBy[field] = searchParams.get(field) || ''
    }
  }
  return filterBy
}

function getEmptyToy() {
  const newToy = _createToy('Default name')
  newToy._id = null
  return newToy
}

function _createToys() {
  let toys = utilService.loadFromStorage(TOY_KEY)
  if (!toys || !toys.length) {
    toys = []
    const names = [
      "Ravenclaw", "Bloodfang", "Nightshade", "Grimhollow", "Venomira",
      "Skullcrusher", "Hexbane", "Cinderfiend", "Rotfang", "Phantomora",
      "Ghoulspire", "Dreadmire", "Shadowfang", "Cryptbane", "Boneveil",
      "Wraithclaw", "Darkthorn", "Soulreaper", "Ashfang", "Hollowfang"
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
