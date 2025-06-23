import { getTasks } from './taskForm.js';  // ✅ You already have this


function renderSingleProjectTasks() {
  const activeProject = localStorage.getItem("activeProject");
  if (!activeProject) return;

  document.querySelector("h2").textContent = activeProject;

  const tasks = getTasks();
  const filteredTasks = tasks.filter(task => task.project === activeProject);

  // Group by status
  const todoBody = document.querySelector("#todo-body");
  const doneBody = document.querySelector("#done-body");

  todoBody.innerHTML = "";
  doneBody.innerHTML = "";

  filteredTasks.forEach((task, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="task-name">
        <span class="input"><input type="checkbox" ${task.status === "done" ? "checked" : ""}></span>
        <div>
          <span class="block name">${task.taskName}</span>
          <span class="block description">${task.description}</span>
        </div>
      </td>
      <td>${task.dueDate}</td>
      <td><span class="tags">${task.project}</span></td>
      <td><span class="tags">${task.priority}</span></td>
    `;

    if (task.status === "todo") todoBody.appendChild(row);
    else if (task.status === "done") doneBody.appendChild(row);
  });
}

export { renderSingleProjectTasks };
