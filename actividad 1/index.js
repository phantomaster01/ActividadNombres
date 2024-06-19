document.addEventListener('DOMContentLoaded', loadTasks);

document.querySelector('#task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    addTask();
});

function addTask() {
    const taskName = document.querySelector('#task-name').value;
    const startDate = document.querySelector('#start-date').value;
    const endDate = document.querySelector('#end-date').value;
    const responsible = document.querySelector('#responsible').value;

    if (new Date(endDate) < new Date(startDate)) {
        alert('La fecha de fin no puede ser menor a la fecha de inicio.');
        return;
    }

    const task = {
        name: taskName,
        startDate: startDate,
        endDate: endDate,
        responsible: responsible,
        completed: false
    };

    saveTask(task);
    renderTask(task);
    document.querySelector('#task-form').reset(); // Clear the form
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => renderTask(task));
}

function renderTask(task) {
    const taskList = document.querySelector('#task-list');
    const taskItem = document.createElement('li');
    taskItem.className = `list-group-item ${task.completed ? 'list-group-item-success' : (new Date(task.endDate) < new Date() ? 'list-group-item-danger' : 'list-group-item-light')}`;
    taskItem.innerHTML = `
        <strong>${task.name}</strong><br>
        <small>Inicio: ${task.startDate} - Fin: ${task.endDate} - Responsable: ${task.responsible}</small>
        <div class="btn-container">
            <button class="btn btn-success ml-2" onclick="completeTask(this)">✔</button>
            ${task.completed ? '<button class="btn btn-warning ml-2" onclick="uncompleteTask(this)">✖</button>' : ''}
            <button class="btn btn-danger ml-2" onclick="deleteTask(this)">🗑</button>
        </div>
    `;
    taskList.appendChild(taskItem);
}

function completeTask(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.classList.remove('list-group-item-light');
    taskItem.classList.add('list-group-item-success');
    button.nextElementSibling.style.display = 'inline';
    button.style.display = 'none';
    updateTaskStatus(taskItem, true);
}

function uncompleteTask(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.classList.remove('list-group-item-success');
    taskItem.classList.add('list-group-item-light');
    button.previousElementSibling.style.display = 'inline';
    button.style.display = 'none';
    updateTaskStatus(taskItem, false);
}

function deleteTask(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.remove();
    removeTaskFromStorage(taskItem);
}

function updateTaskStatus(taskItem, status) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const taskName = taskItem.querySelector('strong').innerText;
    const task = tasks.find(task => task.name === taskName);
    task.completed = status;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromStorage(taskItem) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    const taskName = taskItem.querySelector('strong').innerText;
    tasks = tasks.filter(task => task.name !== taskName);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
