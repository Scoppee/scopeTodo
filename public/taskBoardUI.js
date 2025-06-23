import { getTasks } from "./taskForm.js"; // or wherever getTasks is

function renderTaskBoard() {
  const todoCol = document.getElementById("todo-column");

  const doneCol = document.getElementById("done-column");

  if (!todoCol  || !doneCol) return;

  // Clear old content
  todoCol.innerHTML = "";

  doneCol.innerHTML = "";

  const tasks = getTasks();

  tasks.forEach(task => {
    const card = document.createElement("div");
    card.classList.add("card", "task-board-card");

    card.innerHTML = `
      <span class="block title">${task.taskName}</span>
      <div class="progress-tags task-board-priority">
          <span class="tags" id="${getPriorityTag(task.priority)}">${task.priority}</span>
          <span class="tags" id="done">${task.importance}</span>
      </div>
      <span class="block det">${task.description}</span>
      <span class="block time">${formatDate(task.dueDate)}</span>
    `;

    // Append to appropriate column
    if (task.status === "todo") {
      todoCol.appendChild(card);
    } else if (task.status === "done") {
      doneCol.appendChild(card);
    }
  });
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short", // e.g., "Jun"
    day: "numeric", // e.g., "24"
  });
}

function getPriorityTag(value) {
  if (!value) return "";
  const val = value.toLowerCase();
  if (val.includes("high")) return "todo";
  if (val.includes("medium")) return "inprogress";
  if (val.includes("low")) return "done";
  return val; // fallback
}

export { renderTaskBoard };
