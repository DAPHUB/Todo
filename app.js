import {createStore} from "./state/createStore.js";
import {reducer} from "./state/reducer.js";
import {renderTodos} from "./render/render.js";
import {todosEvents} from "./eventHandlers.js"

const todosContainer = document.querySelector("#todos-container");
const input = document.querySelector("#todo-input");
const clearBtn = document.querySelector("#clear-btn");
const filter = document.querySelector("#filter");


const initialState = JSON.parse(window.localStorage.getItem("TODO")) || [];
const store = createStore(reducer,initialState);


store.subscribe(() => {
    const state = store.getState();
    window.localStorage.setItem("TODO", JSON.stringify(state));
});

renderTodos(todosContainer, store.getState());




input.addEventListener("keyup", (e) => {
    const event = todosEvents(e, store, {input, todosContainer});
    event.addTodo();
});

clearBtn.addEventListener("click", (e) => {
    const event = todosEvents(e, store, {todosContainer});
    event.clearTodosContainer();
});

input.addEventListener("keyup", (e) => {
    const event = todosEvents(e, store);
    event.useFilter();
});

[todosContainer, filter].forEach(el => {
    el.addEventListener("change", (e) => {
        const event = todosEvents(e, store);
        event.useFilter();
    })
});

todosContainer.addEventListener("click", (e) =>{
    const eventClass = event.target.className;
    const events = todosEvents(e, store);

    switch(eventClass) {
        case "remove-todo":
            events.removeTodo();
        break;
    
        case "check-box":
            events.changeCheckbox();
        break;

        case "edit-todo":
            events.editTodo();
        break;

    } 
});












