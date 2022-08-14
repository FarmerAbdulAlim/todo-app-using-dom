//Selecting elements and assign them to variables.
let newTask = document.querySelector('#new-task');
let form = document.querySelector('form');
let incompleTaskUl = document.querySelector('#items');
let completeTaskUl = document.querySelector('.complete-list ul');

//creating functions fot adding task
let createTask = function(task) {
    let listElement = document.createElement('li');
    let checkBoxElement = document.createElement('input');
    let labelElement = document.createElement('label');
    labelElement.innerText = task;
    checkBoxElement.type = 'checkbox'; //set attribute property of the checkbox
    listElement.appendChild(checkBoxElement);
    listElement.appendChild(labelElement);
    return listElement;
}
//functions for catching event while clicking ADD TASK
let catchEvent = function(event) {
    event.preventDefault();
    let listItem = createTask(newTask.value);
    incompleTaskUl.appendChild(listItem);
    newTask.value = "";
    //creating a function which allows us to make it completed, when click the checkbox
    incompletedToCompletedItems(listItem, completeTask);
}

//while we click checkbox, then items will go from incompleted to completed section
let completeTask = function() {
    let listItem = this.parentNode;
    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'delete';
    listItem.appendChild(deleteButton);

    //remove checkbox in completed items
    let checkBox = listItem.querySelector('input[type="checkbox"]');
    checkBox.remove();

    //now push item in complete UL
    completeTaskUl.appendChild(listItem);

    //bind delete button in complete items
    bindCompletedItems(listItem, deleteTask);
}

let deleteTask = function() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
}


let incompletedToCompletedItems = function(taskItem, checkBoxClick) {
    let checkBox = taskItem.querySelector('input[type="checkbox"]');
    checkBox.onchange = checkBoxClick;
}

let bindCompletedItems = function(taskItem, deleteButtonClick) {
    let deleteButton = taskItem.querySelector('.delete');
    deleteButton.onclick = deleteButtonClick;
}

for(let i=0; i<incompleTaskUl.children.length; i++) {
    incompletedToCompletedItems(incompleTaskUl.children[i], completeTask);
}

for(let i=0; i<completeTaskUl.children.length; i++) {
    bindCompletedItems(completeTaskUl.children[i], deleteTask);
}

form.addEventListener('submit', catchEvent);
