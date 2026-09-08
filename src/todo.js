function createTodo (title, description, dueDate, notes ="", subTasksArray = [], status="ongoing", priorityLevel="low") {
    
    return {
        id: crypto.randomUUID(),
        title: title,
        description: description,
        dueDate: dueDate,
        notes: notes,
        subTasks: subTasksArray,
        status: status,
        priorityLevel: priorityLevel,

        //allows users to update property values of created objects
        updateDetails: function(changes) {
            const {id, ...allowedProperties} = changes;
            Object.assign(this, allowedProperties);
        }
    }
}


const task = createTodo("read");
console.log(task.title);
console.log(task.id);
console.log(task.status);



task.updateDetails({title:"dear", id:"qwe", status:"completed"});
console.log(task.title);
console.log(task.id);
console.log(task.status);