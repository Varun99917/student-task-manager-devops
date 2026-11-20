
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

async function fetchTasks() {
    try {
        const response = await fetch("/api/tasks");
        if (!response.ok) throw new Error("Failed to load tasks");

        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        taskList.innerHTML = '<p class="empty">Unable to load tasks. Please try again.</p>';
    }
}

function displayTasks(tasks) {
    taskList.innerHTML = "";

    document.getElementById("totalTasks").textContent = tasks.length;

    document.getElementById("completedTasks").textContent =
        tasks.filter(task => task.completed).length;

    document.getElementById("pendingTasks").textContent =
        tasks.filter(task => !task.completed).length;

    document.getElementById("taskCount").textContent =
        `${tasks.length} tasks`;

    if (tasks.length === 0) {
        taskList.innerHTML = '<p class="empty">No tasks yet. Add your first task!</p>';
        return;
    }

    tasks.forEach(task => {
        const item = document.createElement("div");
        item.className = `task-item ${task.completed ? "completed" : ""}`;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            updateTask(task._id, checkbox.checked);
        });

        const title = document.createElement("span");
        title.className = "task-title";
        title.textContent = task.title;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            deleteTask(task._id);
        });

        item.append(checkbox, title, deleteButton);
        taskList.appendChild(item);
    });
}

taskForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = taskInput.value.trim();
    if (!title) return;

    try {
        const response = await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title })
        });

        if (!response.ok) throw new Error("Unable to add task");

        taskInput.value = "";
        fetchTasks();
    } catch (error) {
        alert(error.message);
    }
});

async function updateTask(id, completed) {
    try {
        const response = await fetch(`/api/tasks/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed })
        });

        if (!response.ok) throw new Error("Unable to update task");

        fetchTasks();
    } catch (error) {
        alert(error.message);
    }
}

async function deleteTask(id) {
    try {
        const response = await fetch(`/api/tasks/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Unable to delete task");

        fetchTasks();
    } catch (error) {
        alert(error.message);
    }
}

fetchTasks();
