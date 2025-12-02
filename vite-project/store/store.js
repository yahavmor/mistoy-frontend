
import {createStore} from 'redux';


export const SET_TOYS = 'SET_TOYS';
export const REMOVE_TOY = 'REMOVE_TOY';
export const ADD_TOY = 'ADD_TOY';
export const SET_LOADING = 'SET_LOADING';

const initialState = {
    toys: [],
    isLoading: false,
};



function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_TOYS:
            return { ...state, toys: cmd.toys };

        case REMOVE_TOY:
            return { ...state, toys: state.toys.filter(toy => toy._id !== cmd.toyId) };

        case ADD_TOY:
            return { ...state, toys: [...state.toys, cmd.toy] };

        case SET_LOADING:
            return { ...state, isLoading: cmd.isLoading }
        default:
            return state;
    }
}

export const store = createStore(appReducer);


