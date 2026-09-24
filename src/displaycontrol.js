const addBtn = document.querySelector('.addbutton');

// function for converting button to input and vice versa
function switchTo() {
    // initialize input creation for project title in memory
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Project Title';
    inputField.className = 'title-input';

    // render the inputField element on html
    addBtn.replaceWith(inputField);
}

export { switchTo }