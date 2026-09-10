import { createTodo } from "./todo.js";

function createProject(name, id = crypto.randomUUID()) {
    let todos =[];

    function addTodo(todo) {
        todos.push(todo);
    }

    function removeTodo(todoId) {
        const index = todos.findIndex(todo => todo.id === todoId);

        if (index !== -1) {
            todos.splice(index, 1);
        }
    }

    function getTodo(todoId) {
        return todos.find(todo => todo.id === todoId);
    }

    return{
        id: id,
        name: name,
        todos: todos,
        addTodo,
        removeTodo,
        getTodo
    }

}

export {createProject};
