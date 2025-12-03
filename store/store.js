
import {createStore} from 'redux';
import { removeToy } from './toy.actions';


export const SET_TOYS = 'SET_TOYS';
export const REMOVE_TOY = 'REMOVE_TOY';
export const ADD_TOY = 'ADD_TOY';
export const SET_LOADING = 'SET_LOADING';
export const SET_TOY = 'SET_TOY'
export const SET_CHAT = 'SET_CHAT'

const initialState = {
    toys: [],
    isLoading: false,
    toy: null,
    chat: false
};



function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_TOYS:
            return { ...state, toys: cmd.toys };
        case SET_TOY:
            return { ...state, toy: cmd.toy };
        case REMOVE_TOY:
            return { ...state, toys: state.toys.filter(toy => toy._id !== cmd.toyId) };
        case ADD_TOY:
            return { ...state, toys: [...state.toys, cmd.toy] };
        case SET_LOADING:
            return { ...state, isLoading: cmd.isLoading }
        case SET_CHAT:
            return { ...state, chat: cmd.chat}    
        default:
            return state;
    }
}

export const store = createStore(appReducer);


