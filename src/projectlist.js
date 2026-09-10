import { createProject } from "./project.js";

const allProjects = [];

function addProject(project) {
    allProjects.push(project);
}

function removeProject(projectId) {
    const index = allProjects.findIndex(project => project.id === projectId);

    if (index !== -1) {
        allProjects.splice(index,1);
    }
}

function getProject(projectId) {
    return allProjects.find(project => project.id === projectId);
}

function getAllProjects() {
    return allProjects;
}

function initializeDefaultProject() {
    if (allProjects.length === 0) {
        let defaultProject = createProject("default", "default");
        addProject(defaultProject);

    }
}

export {addProject, removeProject, getProject, getAllProjects, initializeDefaultProject};