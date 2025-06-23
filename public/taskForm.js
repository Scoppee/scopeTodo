import { renderTaskList } from './taskListUI.js';
import { populateProjectDropdown } from './projectDropdownUI.js';

let editModeIndex = null; // null means Add Mode

// Add Task Constructor
function Task(taskName, dueDate, priority, startTime, endTime, importance, project, description) {
  this.taskName = taskName;
  this.dueDate = dueDate;
  this.priority = priority;
  this.startTime = startTime;
  this.endTime = endTime;
  this.importance = importance;
  this.project = project;
  this.description = description;
  this.createdAt = new Date().toISOString(); // Optional metadata
  this.status = "todo";
}


function setupTaskForm() {
    const form = document.getElementById("taskForm");
    const submitBtn = document.getElementById("submitTask");
    const dialog = document.getElementById("mydialog");
  
    if (!form || !submitBtn || !dialog) return;

    populateProjectDropdown();
  
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault(); // ✅ Prevent any default behavior (just in case)
  
      // Only run add logic if the button says "Add Task"

    if (form.checkValidity()) {
      const formData = new FormData(form);

      const task = new Task(
        formData.get("taskName"),
        formData.get("dueDate"),
        formData.get("priority"),
        formData.get("startTime"),
        formData.get("endTime"),
        formData.get("importance"),
        formData.get("project"),
        formData.get("taskDescription").trim()
      );

      console.log("✅ Task Created:", task);

      // const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      // savedTasks.push(task);
      // localStorage.setItem("tasks", JSON.stringify(savedTasks));

      const savedTasks = getTasks();

    if (editModeIndex !== null) {
      // ✅ Update mode
      savedTasks[editModeIndex] = task;
      editModeIndex = null;
      submitBtn.textContent = "Add Task";
    } else {
      // ✅ Add mode
      savedTasks.push(task);
    }


      saveTasks(savedTasks);
      const allTasks = getTasks()
      renderTaskList(allTasks);
      form.reset();
      dialog.close();
    } else {
      form.reportValidity(); // 🔔 Show validation UI
    }   
    });
  }


  // Get all tasks from localStorage
function getTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return tasks;
}


function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
}

function updateTask(index, updatedTask) {
  const tasks = getTasks();
  tasks[index] = updatedTask;
  saveTasks(tasks);
}

function updateStatus(index, status) {
  const tasks = getTasks();
  tasks[index].status = status;
  saveTasks(tasks);
}



function openEditForm(index) {
  const tasks = getTasks();
  const task = tasks[index];

  const dialog = document.querySelector("#mydialog");
  if (!dialog) return;

  // Pre-fill the form inputs
  document.querySelector("#taskName").value = task.taskName;
  document.querySelector("#dueDate").value = task.dueDate;
  document.querySelector("#taskDescription").value = task.description;
  document.querySelector("#startTime").value = task.startTime || "";
  document.querySelector("#endTime").value = task.endTime || "";

  // ✅ Pre-fill radio for priority
  const priorityRadio = document.querySelector(`input[name="priority"][id="${task.priority.toLowerCase()}"]`);
  if (priorityRadio) priorityRadio.checked = true;

  // ✅ Pre-fill radio for importance
  const importanceRadio = document.querySelector(`input[name="importance"][id="${task.importance?.toLowerCase()}"]`);
  if (importanceRadio) importanceRadio.checked = true;

  // ✅ Pre-fill select dropdown for project
  const projectSelect = document.querySelector('select');
  if (projectSelect) projectSelect.value = task.project;

  // Show dialog
  dialog.showModal();

  // Replace the Add Task button behavior temporarily
  const addBtn = document.querySelector(".addBtn");
  addBtn.textContent = "Update Task";

  editModeIndex = index; // ✅ Set update mode

}






export { getTasks, deleteTask, updateTask, updateStatus, openEditForm };
export { setupTaskForm };


