import { toyService } from "../services/toy.service.js";


import { SET_LOADING, store ,SET_TOYS,REMOVE_TOY ,SET_TOY , SET_CHAT, SET_USER,IS_SIGNUP} from "./store.js"

export async function loadToys(filterBy) {
    store.dispatch({ type: SET_LOADING, isLoading: true })
    try {
        const toys = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
        console.error('err:', err)
        throw err
    } finally {
        store.dispatch({ type: SET_LOADING, isLoading: false })
    }
}
  
export async function removeToy(toyId) {
    try{
        const toy = await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId: toyId })
    }
    catch{
        console.error('err:', err)
        throw err
    }
}
export function setLoading(isLoading) {
      return store.dispatch({ type: SET_LOADING, isLoading })     
}
export async function setToy(toyId){
    try{
        const toy = await toyService.get(toyId)
        store.dispatch({ type: SET_TOY, toy })
    }
    catch{
        console.error('err:', err)
        throw err
    }
}
export function setChat(isOpen){
    return store.dispatch({ type: SET_CHAT, chat: isOpen })
}
export function setUser(user) {
    return store.dispatch({ type: SET_USER, user })
}
export function setIsSignUp(isSignUp) {
  return store.dispatch({ type: IS_SIGNUP, isSignUp })
}
