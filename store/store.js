
import {createStore} from 'redux';


export const SET_TOYS = 'SET_TOYS';
export const REMOVE_TOY = 'REMOVE_TOY';
export const ADD_TOY = 'ADD_TOY';
export const SET_LOADING = 'SET_LOADING';
export const SET_TOY = 'SET_TOY'
export const SET_CHAT = 'SET_CHAT'
export const SET_USER = 'SET_USER'
export const IS_SIGNUP = 'IS_SIGNUP'
export const SET_REVIEWS = 'SET_REVIEWS'
export const ADD_REVIEW = 'ADD_REVIEW'
export const REMOVE_REVIEW = 'REMOVE_REVIEW'
export const IS_ADMIN_CHANGED = 'IS_ADMIN_CHANGED'


const savedUser = JSON.parse(sessionStorage.getItem('loggedinUser'))

const initialState = {
    toys: [],
    isLoading: false,
    toy: null,
    chat: false,
    user: savedUser ? savedUser : null,
    isSignUp: false,  
    reviews: []
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
            if (cmd.user) {
                sessionStorage.setItem('loggedinUser', JSON.stringify(cmd.user))
            } else {
                sessionStorage.removeItem('loggedinUser')
            }
            return { ...state, user: cmd.user }
        case IS_SIGNUP:
            return { ...state, isSignUp: cmd.isSignUp }
        case SET_REVIEWS:
            return { ...state, reviews: cmd.reviews }
        case ADD_REVIEW:
            return { ...state, reviews: [...state.reviews, cmd.review] }
        case REMOVE_REVIEW:
            return { ...state, reviews: state.reviews.filter(review => review._id !== cmd.reviewId) }
        default:
            return state;
    }
}

export const store = createStore(appReducer);


