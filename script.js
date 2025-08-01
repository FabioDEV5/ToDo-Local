document.getElementById('task-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('task-title').value.trim();
    const description = document.getElementById('task-description').value.trim();

    if (title && description) {
        addTask(title, description);
        document.getElementById('task-form').reset();
    }
});

const addTask = (title, description) => {
    const taskList = document.getElementById('tasks');

    const li = document.createElement('li');
    li.innerHTML = `<strong>${title}</strong>: ${description}`;

    taskList.appendChild(li);
};
