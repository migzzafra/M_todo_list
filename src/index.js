import { submitProject } from "./displaycontrol.js";
import { initializeDefaultProject, loadProjects } from "./projectlist.js";
import { loadState, saveState } from "./storagemananement.js";
import "./styles.css";

function initializeApp() {
    const result = loadState();

    if (result === null) {
        initializeDefaultProject();
    } else {
        loadProjects(result);
        
    }
    
    saveState();
}

document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
});

// Method to add projects
const projectButton = document.querySelector('.addproject-Btn');

projectButton.addEventListener('click',() => {
    submitProject();
    console.log('Clicked Add Project Button');
});