export function renderTodos(node, todos) {  
    todos.forEach(todo => {

        const div = document.createElement("div");
        div.classList.add("todo");
        div.id = todo.id;

        const checkbox = document.createElement("input");
        checkbox.classList.add("check-box");
        checkbox.type = "checkbox";
        checkbox.checked = todo.isDone;


        const span = document.createElement("span");
        span.textContent = todo.text;       
        if(todo.isDone) {
           span.classList.toggle("complete");
           div.classList.add("isCompleted");
        }
            
        const delButton = document.createElement("button");
        delButton.classList.add("remove-todo")
        delButton.textContent = "X";

        const editButton = document.createElement("button");
        editButton.classList.add("edit-todo")
        editButton.textContent = "edit";

        div.append(checkbox, span,  editButton, delButton);
        node.append(div);  
    });
}

