import {actions} from "./state/actions.js";
import {renderTodos} from "./render/render.js"

export function todosEvents(e, store, elems) {
    return  {

        removeTodo: () => {           
            const element = e.target.parentElement;
            element.classList.add("fall")

            setTimeout(() => {
                element.parentNode.removeChild(element);
            }, 500);

            
            store.dispatch({
                type: actions.REMOVE_TODO,
                id: e.target.parentElement.id
            });
        },
    
        changeCheckbox: () => {
            e.target.nextElementSibling.classList.toggle("complete");
            e.target.parentElement.classList.toggle("isCompleted");

            store.dispatch({
                type: actions.TOGGLE,
                id: e.target.parentElement.id
            });
        },

        editTodo: () => {
            const textField = e.target.previousElementSibling;           
            const todo = textField.parentElement;
            const textLength = textField.innerText.length;

            todo.classList.add("edited");        
            textField.contentEditable = true;
            setCursor(textLength, textField)


            textField.addEventListener("blur", () => {
                textField.contentEditable = false;
                todo.classList.remove("edited");
                
                store.dispatch({
                    type: actions.EDIT_TODO,
                    text: textField.textContent,
                    id: textField.parentElement.id
                });
            });
        
            textField.addEventListener("keydown", (event) => {
                
                if (event.key === "Enter") {
                    textField.readOnly = true;
                    textField.blur();                   
                    event.preventDefault();
                }
                              
            });  
        },

        addTodo: () => {
            const input = elems.input;
            const text = input.value;

            const container = elems.todosContainer;
            if (event.key === "Enter" && text !== "") {
                const state = store.getState();
            
                const todo = {
                    id: state.length > 0 ? state[state.length - 1].id + 1 : 0,
                    text: text,
                    isDone: false
                }

                renderTodos(container, [todo]);

                input.value = "";

                store.dispatch({
                    type: actions.ADD_TODO,
                    text: text
                });
           }
        },

        clearTodosContainer: () => {
            const state = store.getState();
            const container = elems.todosContainer;

            if(state.length > 0) {
                const result = window.confirm("Do you really want to completely clear the to-do list?");

                if(result) {           
                    while (container.firstChild) {
                        container.removeChild(container.firstChild);
                    }

                    store.dispatch({
                        type: actions.REMOVE_ALL_TODOS
                    });
                }
            }    
        },

        useFilter: () => {
            const filterType = document.querySelector("#filter").value;

            const todos = document.querySelectorAll(".todo");
            todos.forEach(todo => {
                switch(filterType) {
                    case "all":
                        todo.style.display = "flex";
                    break;

                    case "completed":
                        if (todo.classList.contains("isCompleted")) {
                            todo.style.display = "flex";
                        } else {
                            todo.style.display = "none";
                        }
                    break;
                        
                    case "uncompleted":
                        if (!todo.classList.contains("isCompleted")) {
                            todo.style.display = "flex";
                        } else {
                            todo.style.display = "none";
                        }
                    break;
                } 
            });
        }
    }
    
}

function setCursor(pos, el) {      
    const setpos = document.createRange();  
    const set = window.getSelection(); 
        
    setpos.setStart(el.childNodes[0], pos);  
    setpos.collapse(true);     
    set.removeAllRanges();       
    set.addRange(setpos);        
    el.focus();

} 