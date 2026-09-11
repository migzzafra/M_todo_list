import { createProject } from "./project.js";
import { getAllProjects } from "./projectlist.js";
import { createTodo } from "./todo.js";

function saveState() {
    const allProjects = getAllProjects();
    const stringVersion = JSON.stringify(allProjects);
    localStorage.setItem("todoAppData", stringVersion);
}

function loadState() {
    const rawString = localStorage.getItem("todoAppData");

    if (rawString === null) {
        return null;
    }

    const plainData = JSON.parse(rawString);

    const realProjects = [];

    for (const plainProject of plainData) {
        const newProject = createProject(plainProject.name , plainProject.id);

        for (const plainTodo of plainProject.todos) {
            const newTodo = createTodo(plainTodo.title, plainTodo.description, plainTodo.dueDate, plainTodo.notes, plainTodo.subTasks, plainTodo.status, plainTodo.priorityLevel);
            newProject.addTodo(newTodo);
        }
        
        realProjects.push(newProject);
    }

    return realProjects;
}

export { saveState, loadState};