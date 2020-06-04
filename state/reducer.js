import {actions} from "./actions.js"

export function reducer(state, action = actions.init) {
    const todo = {
        id: state.length > 0 ? state[state.length - 1].id + 1 : 0,
        text: action.text,
        isDone: false
    }

    switch(action.type) {
        case actions.ADD_TODO:
            state.push(todo);
        break;

        case actions.REMOVE_TODO:
            state = state.filter(todo => todo.id !== Number(action.id));
        break;

        case actions.REMOVE_ALL_TODOS:
            state = [];
        break;

        case actions.TOGGLE:
            state = state.map(todo => 
                todo.id === Number(action.id) ? { id: todo.id, text: todo.text, isDone: !todo.isDone } : todo
            );
        break;

        case actions.EDIT_TODO:
            state = state.map(todo => 
                todo.id === Number(action.id) ? { id: todo.id, text: action.text, isDone: todo.isDone } : todo
            );
        break;
    }

    return state;
}
