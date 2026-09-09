import { createTodo } from "./todo.js";

const taskOne = createTodo("read");
const taskTwo = createTodo("write");
const taskThree = createTodo("draw");


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


const proOne = createProject("SetOne");
proOne.addTodo(taskOne);
proOne.addTodo(taskTwo);
proOne.addTodo(taskThree);

console.log(proOne.todos);


proOne.removeTodo(taskOne.id);
console.log("deletion starts here");


console.log("updated list here");
console.log(proOne.todos);

console.log("retrieve todo");
const retrievedTodo = proOne.getTodo(taskTwo.id);
console.log(retrievedTodo);