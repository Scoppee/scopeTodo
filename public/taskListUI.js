import { deleteTask, updateStatus, updateTask,  getTasks, openEditForm } from './taskForm.js';

function renderTaskList(tasks) {
  const todoTable = document.querySelector("#todo-body");
  const doneTable = document.querySelector("#done-body");

  todoTable.innerHTML = "";
  doneTable.innerHTML = "";

  tasks.forEach((task, index) => {
    const row = document.createElement("tr");

    let priorityId = task.priority === "High" ? "todo" :
                     task.priority === "Medium" ? "inprogress" : "done";

    row.innerHTML = `
      <td class="task-name">
        <span class="input">
          <input type="checkbox" data-index="${index}" class="status-toggle" ${task.status === "done" ? "checked" : ""}>
        </span>
        <div>
          <span class="block name">${task.taskName}</span>
          <span class="block description">${task.description}</span>
        </div>
      </td>
      <td>${task.dueDate}</td>
      <td><span class="tags" id="all">${task.project}</span></td>
      <td><span class="tags" id="${priorityId}">${task.priority}</span></td>
      <td>
        <button data-index="${index}" class="viewall edit-btn">✏️</button>
        <button data-index="${index}" class="viewall delete-btn">🗑️</button>
      </td>
    `;

    if (task.status === "todo") {
      todoTable.appendChild(row);
    } else if (task.status === "done") {
      doneTable.appendChild(row);
    }
  });

  addEventListeners();
}

function addEventListeners() {
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      deleteTask(index);
      renderTaskList(getTasks());
    });
  });

  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      // Trigger dialog/modal with task data pre-filled
      openEditForm(index);
    });
  });

  document.querySelectorAll(".status-toggle").forEach(box => {
    box.addEventListener("change", () => {
      const index = box.dataset.index;
      const tasks = getTasks();
      const task = tasks[index];

      task.status = box.checked ? "done" : "todo"; // Simplified toggle
      updateTask(index, task);
      renderTaskList(getTasks());
    });
  });
}

export { renderTaskList };
