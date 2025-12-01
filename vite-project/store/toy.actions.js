import { toyService } from "../services/toy.service.js";


import { SET_LOADING, store ,SET_TOYS,REMOVE_TOY } from "./store.js"

export function loadToys(filterBy){
      store.dispatch({ type: SET_LOADING, isLoading: true })
      return toyService.query(filterBy)
            .then(toys => store.dispatch({ type: SET_TOYS, toys }))
            .catch(err => {
                console.error('err:', err)
                throw err
            })
            .finally(() => store.dispatch({ type: SET_LOADING, isLoading: false }))
}
export function removeToy(toy) {
      return toyService.remove(toy._id)
            .then(() => store.dispatch({ type: REMOVE_TOY, toyId: toy._id }))
            .catch(err => {
                console.error('err:', err)
                throw err
            })
}
export function setLoading(isLoading) {
      return store.dispatch({ type: SET_LOADING, isLoading })     
}