import { toyService } from "../services/toy.service.js";


import { SET_LOADING, store ,SET_TOYS,REMOVE_TOY ,SET_TOY , SET_CHAT} from "./store.js"

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
export function removeToy(toyId) {
      return toyService.remove(toyId)
            .then(() => store.dispatch({ type: REMOVE_TOY, toyId: toyId }))
            .catch(err => {
                console.error('err:', err)
                throw err
            })
}
export function setLoading(isLoading) {
      return store.dispatch({ type: SET_LOADING, isLoading })     
}
export function setToy(toyId){
      return toyService.get(toyId)
          .then(toy => {
              store.dispatch({ type: SET_TOY, toy })
              return toy
          })
          .catch(err => {
              console.error('err:', err)
              throw err
          })
}
export function setChat(isOpen){
    return store.dispatch({ type: SET_CHAT, chat: isOpen })
}