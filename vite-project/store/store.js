
import {createStore} from 'redux';


export const SET_TODOS = 'SET_TOYS';
export const REMOVE_TODO = 'REMOVE_TOY';
export const ADD_TODO = 'ADD_TOY';
export const SET_LOADING = 'SET_LOADING';

const initialState = {
    toys: [],
    isLoading: false,
};



function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_TODOS:
            return { ...state, todos: cmd.todos };

        case REMOVE_TODO:
            return { ...state, todos: state.todos.filter(todo => todo._id !== cmd.todoId) };

        case ADD_TODO:
            return { ...state, todos: [...state.todos, cmd.todo] };

        case SET_LOADING:
            return { ...state, isLoading: cmd.isLoading }
        default:
            return state;
    }
}

export const store = createStore(appReducer);


