document.addEventListener('DOMContentLoaded', function() {
    loadTasks();

    document
        .getElementById('task-search')
        .addEventListener('input', function(event) {
            renderTasks(event.target.value);
        });
});

document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;

    if (title && description) {
        const task = { title, description };
        saveTask(task);

        const searchText = document.getElementById('task-search').value;
        renderTasks(searchText);

        this.reset();
    }
});

function renderTasks(filterText = '') {
    const taskList = document.getElementById('tasks');
    taskList.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];


    const filteredTasks = tasks.filter(task => {
        const combined = (task.title + ' ' + task.description).toLowerCase();
        return combined.includes(filterText.toLowerCase());
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${task.title}</strong>: ${task.description}
            <button onclick="removeTask(${index})">Remover</button>
        `;
        taskList.appendChild(li);
    });
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    renderTasks();
}

function removeTask(indexToRemove) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter((_, index) => index !== indexToRemove);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    const searchText = document.getElementById('task-search').value;
    renderTasks(searchText);
}
