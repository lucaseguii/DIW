const TASKSJSON = [
    {
        id: 1,
        title: "Clean dishes",
        priority: "low"
    },
    {
        id: 2,
        title: "Study Jquery",
        priority: "medium"
    }
];

$(() => {
    let tasks = loadTasksFromLocalStorage();

    if (tasks.length === 0) {
        tasks = TASKSJSON;
        saveTasksToLocalStorage(tasks);
    }

    $.each(tasks, function (index, task) {
        appendTask(task);
    });

    $("#btn-add-task").on("click", () => {
        const taskTitle = $("#task-title").val().trim();
        const taskPriority = $("#task-priority").val().trim();

        if (taskTitle) {
            const task = {
                id: tasks.length + 1,
                title: taskTitle,
                priority: taskPriority || "low"
            };

            tasks.push(task);
            appendTask(task);
            saveTasksToLocalStorage(tasks);
        }
    });
});

function appendTask(task) {
    $("#todo-list").append(`<li>${task.title} - ${task.priority}</li>`);
}

function loadTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
