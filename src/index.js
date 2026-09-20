import { makeButton, makeInput } from "./displaycontrol.js";
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
})

const button = document.querySelector('.addproject-Btn');


button.addEventListener('click', () => {
    makeInput();
    console.log("Click was executed.");
});

