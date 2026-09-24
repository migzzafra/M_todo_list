import { createProject } from "./project.js";
import { addProject } from "./projectlist.js";

// select the DOM
const addBtn = document.querySelector('.addbutton');
const projectContainer = document.querySelector('.projectlist-section');
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

export { submitProject };