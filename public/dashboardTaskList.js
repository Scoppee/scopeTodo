import { deleteTask, updateStatus, updateTask,  getTasks, openEditForm } from './taskForm.js';

function renderDashboardTaskList(tasks) {
  const tododTable = document.querySelector("#todo-dbody");


  tododTable.innerHTML = "";


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
      <td>${formatDate(task.dueDate)}</td>
      <td><span class="tags" id="${priorityId}">${task.priority}</span></td>
    `;

    if (task.status === "todo") {
      tododTable.appendChild(row);
    } 
  });

  addEventListeners();
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short", // e.g., "Jun"
    day: "numeric", // e.g., "24"
  });
}

function addEventListeners() {
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      deleteTask(index);
      renderDashboardTaskList(getTasks());
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
      renderDashboardTaskList(getTasks());
    });
  });
}

export { renderDashboardTaskList };
