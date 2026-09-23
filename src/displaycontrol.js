import { createProject } from "./project.js";
import { addProject } from "./projectlist.js";

const button = document.querySelector('.addproject-Btn');
let currentProjectId;

function makeInput() {;
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Project Title';
    inputField.className = 'project-title-input';

    inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && inputField.value.trim() !== "") {
        const newProject = createProject(inputField.value);
        addProject(newProject);
        
        const projButton = makeButton(newProject);
        
        selectProject(newProject);
        inputField.before(projButton);
        inputField.replaceWith(button);

        console.log(`Name: ${newProject.name} - ID: ${newProject.id}`);

        const taskButton = document.querySelector('.taskbutton');
    
        taskButton.addEventListener("click",() => {
            addTaskForm();
        });

    } else if (e.key === 'Escape') {
        inputField.replaceWith(button);
    }
    });


    button.replaceWith(inputField);
    inputField.focus();
}

function makeButton(project) {
    const projButton = document.createElement("button");
    projButton.textContent = project.name;
    projButton.type = "button";
    projButton.className = 'addproject-Btn';
    projButton.dataset.projectId = project.id;
    

    projButton.addEventListener('click', () => {
        selectProject(project);
    });

    projButton.addEventListener('dblclick', () => {
        editButton(projButton);
    });
    
    return projButton;
}

function editButton(projButton) {
    const editField = document.createElement('input');
    editField.type = 'text';
    editField.value = projButton.textContent;
    editField.className = 'project-title-input';

    editField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && editField.value.trim() !== '') {
            projButton.textContent = editField.value;
            editField.replaceWith(projButton);
        } else if (e.key === 'Escape') {
            editField.replaceWith(projButton);
        }
    });

    projButton.replaceWith(editField);
    editField.focus();
    editField.select();
}

function addTaskBtn() {
    const taskContainer = document.querySelector(".todolist-container");

    const taskBtn = document.createElement("button");
    taskBtn.textContent = "Add Task";
    taskBtn.type = "button";
    taskBtn.className = "taskbutton"

    taskContainer.appendChild(taskBtn);
}

function addTaskForm() {
    /* const title = title;
    const description = description;
    const dueDate = dueDate;
    const notes = notes;
    const subTasks = subTasks;
    const status = status;
    const priorityLevel = priorityLevel; */

    const taskFormTemplate = `
        <div class="formheader">
            <p>Due Date:</p>
            <p>Status:</p>
        </div>
        <div class="taskinfo-container">
            <h3>TITLE</h3>
            <h3>Description</h3>
        </div>
        <div class="tasknotes-container">
            <p>This is where notes are typed in.</p>
        </div>
    `
    document.querySelector('.todoeditor').innerHTML = taskFormTemplate;
}

function selectProject(project) {
    currentProjectId = project.id;
    document.querySelector('.todolist-container').textContent = "";
    document.querySelector('.todoeditor').textContent = "";
    addTaskBtn();
    console.log(project.id);
}

export { makeInput, makeButton, addTaskForm }