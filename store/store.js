
import {createStore} from 'redux';


export const SET_TOYS = 'SET_TOYS';
export const REMOVE_TOY = 'REMOVE_TOY';
export const ADD_TOY = 'ADD_TOY';
export const SET_LOADING = 'SET_LOADING';
export const SET_TOY = 'SET_TOY'
export const SET_CHAT = 'SET_CHAT'
export const SET_USER = 'SET_USER'
export const IS_SIGNUP = 'IS_SIGNUP'

const initialState = {
    toys: [],
    isLoading: false,
    toy: null,
    chat: false,
    user: null,
    isSignUp: false,  
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
        case SET_USER:
            return { ...state, user: cmd.user }
        case IS_SIGNUP:
            return { ...state, isSignUp: cmd.isSignUp }
        default:
            return state;
    }
}

export const store = createStore(appReducer);


