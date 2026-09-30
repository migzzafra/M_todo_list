import { createProject } from "./project.js";
import { addProject } from "./projectlist.js";
import { createTodo } from "./todo.js";

// select the DOM
const addBtn = document.querySelector('.addbutton');
const projectContainer = document.querySelector('.projectlist-section');
const taskContainer = document.querySelector('.todolist-container');
let currentProjectId;


// function for submitting a project
function submitProject() {
    // initialize input creation for project title in memory
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Project Title';
    inputField.className = 'title-input';

    inputField.addEventListener('keydown', (e) => {
        if (e.key === "Enter" && inputField.value.trim() !== "") { /* if Enter is pressed, a new button will be created with the input Title */
            // creating a real project object and submitting it to allProject array
            const newProject = createProject(inputField.value.toUpperCase());
            addProject(newProject);
            
            // creating the button with the project in it in memory
            const submittedProject = makeProjectButton(newProject);
            selectProject(newProject);
            
            // rendering the project button in the UI
            inputField.before(submittedProject);
            inputField.replaceWith(addBtn);

            // method to add task
            makeTaskButton();
                        
            // test log
            console.log(`Project Name: ${newProject.name} | ID: ${newProject.id}`);
        } else if (e.key === 'Escape') { /* if Escape, the project creation is cancelled */ 
            inputField.replaceWith(addBtn);
        }
    });

    addBtn.replaceWith(inputField);
    inputField.focus();
}

// this function generates new "Add Project" button
function makeProjectButton (project) {
    const projectButton = document.createElement('button');
    projectButton.textContent = project.name;
    projectButton.dataset.projectId = project.id;
    projectButton.type = 'button';
    projectButton.className = 'addButton';

    // when a project button is clicked, should return the project object
    projectButton.addEventListener('click', () => {
        selectProject(project);
        makeTaskButton();
    })

    // listener for buttons that allows user to edit the title with double click
    projectButton.addEventListener('dblclick', () => {
        editProjectTitle(projectButton);
        console.log(`Double Clicked ${project.name}`);
    })

    return projectButton;
}

// function that selects project and displays appropriate datas
function selectProject(project) {
    currentProjectId = project.id;
    document.querySelector('.todolist-container').textContent = "";
    document.querySelector('.todoeditor').textContent = "";

    
    console.log(project.id);
}

// function to edit project title
function editProjectTitle(projectButton) {
    const editField = document.createElement('input');
    editField.type = 'text';
    editField.value = projectButton.textContent;
    editField.className = 'title-input';

    // rendering the edit mode in UI
    projectButton.replaceWith(editField);
    editField.focus();
    editField.select();

    editField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && editField.value.trim() !== '') {
            projectButton.textContent = editField.value;
            editField.replaceWith(projectButton);
        } else if (e.key === 'Escape') {
            editField.replaceWith(projectButton);
        }
    });
}

// function to add "Add Task" button after submitting a project
function makeTaskButton() {
    const taskButton = document.createElement('button');
    taskButton.type = 'button';
    taskButton.textContent = 'Add Task';
    taskButton.className = 'task-button';

    taskContainer.appendChild(taskButton);

    taskButton.addEventListener('click', () => {
        makeTaskForm();
        console.log('Add Task button clicked');
    })
}

// function to render a form when "Add task" button is clicked
function makeTaskForm() {
    const taskFormTemplate = `
        <div class="formheader">
            <div class="datecontainer">
                <label for="date">Due Date</label>
                <input type="date" id="date" name="date">
            </div>
            <div class="statuscontainer">
                <label for="status">Status:</label>
                <input type="text" name="status" id="status">
            </div>
        </div>

        <div class="taskinfo-container">
            <div class="titlecontainer">
                <label for="taskTitle">Title</label>
                <input type="text" name="taskTitle" id="taskTitle">
            </div>
            <div class="descriptioncontainer">
                <label for="taskDesc">Description</label>
                <input type="text" name="taskDesc" id="taskDesc">
            </div>
        </div>

        <div class="notescontainer">
            <label for="taskNotes">Notes</label>
            <input type="text" name="taskNotes" id="taskNotes">
        </div>

        <button class="taskFormSubmit" type="button">Submit</button>
    `
    // renders form in the UI
    document.querySelector('.todoeditor').innerHTML = taskFormTemplate;

    // when submit button is clicked, the webapp will retrieve infos and create Todo's using the gathered infos
    const taskFormSubmitBtn = document.querySelector('.taskFormSubmit');

    taskFormSubmitBtn.addEventListener('click', () => {
        const dueDateValue = document.querySelector('#date').value;
        const taskTitleValue = document.querySelector('#taskTitle').value;
        const taskDescValue = document.querySelector('#taskDesc').value;
        const taskNotesValue = document.querySelector('#taskNotes').value;
        const taskStatusValue = document.querySelector('#status').value;

        const newTask = createTodo(taskTitleValue, taskDescValue, dueDateValue, taskNotesValue, undefined, taskStatusValue, undefined);
        

        // creates button with the info/datas input from form
        const addTaskBtn = document.querySelector('.task-button');
        const submittedTask = document.createElement('button');
        submittedTask.type = 'button';
        submittedTask.textContent = newTask.title.toUpperCase();

        taskViewer(newTask);
        
        addTaskBtn.before(submittedTask);
        addTaskBtn.replaceWith(submittedTask);
        
        
    });
}

function taskViewer(newTask) {

    const date = newTask.date;
    const status = newTask.status;
    const title = newTask.title;
    const description = newTask.description;

    const taskResult = `
    <div class="formheader">
        <div class="datecontainer">
            <p>Date: ${date}</p>
        </div>
        <div class="statuscontainer">
            <p>Status: ${status}</p>
        </div>
    </div>
    
    <div class="taskinfo-container">
        <div class="titlecontainer">
            <p>Title: ${title}</p>
        </div>
        <div class="descriptioncontainer">
            <p>Description: ${description}</p>
        </div>
    </div>
    `
    document.querySelector('.todoeditor').innerHTML = taskResult;
    console.log("test for displayed task");
    
}

export { submitProject };