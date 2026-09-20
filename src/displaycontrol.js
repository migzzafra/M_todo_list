const button = document.querySelector('.addproject-Btn');

function makeInput() {;
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Project Title';
    inputField.className = 'project-title-input';

    inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && inputField.value.trim() !== "") {
        const projButton = makeButton(inputField.value);

        inputField.before(projButton);
        inputField.replaceWith(button);
    } else if (e.key === 'Escape') {
        inputField.replaceWith(button);
    }
    });

    button.replaceWith(inputField);
    inputField.focus();
}

function makeButton(text) {
    const projButton = document.createElement("button");
    projButton.textContent = text;
    projButton.type = "button";
    projButton.className = 'addproject-Btn';
    

    projButton.addEventListener('dblclick', () => {
        editButton(projButton);
    })
    
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

export { makeInput, makeButton }