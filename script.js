document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});

document.getElementById('task-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('task-title').value.trim();
    const description = document.getElementById('task-description').value.trim();

    if (title && description) {
        const task = { title, description };
        saveTask(task);
        renderTasks();
        document.getElementById('task-form').reset();
    }
});

const saveTask = (task) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const renderTasks = () => {
    const taskList = document.getElementById('tasks');
    taskList.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(({ title, description }) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${title}</strong>: ${description}`;
        taskList.appendChild(li);
    });
};
