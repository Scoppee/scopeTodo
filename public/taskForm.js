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
}


function setupTaskForm() {
    const form = document.getElementById("taskForm");
    const submitBtn = document.getElementById("submitTask");
    const dialog = document.getElementById("mydialog");
  
    if (!form || !submitBtn || !dialog) return;
  
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault(); // ✅ Prevent any default behavior (just in case)
  
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
  
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
  
        form.reset();
        dialog.close();
      } else {
        form.reportValidity(); // 🔔 Show validation UI
      }
    });
  }

  export { setupTaskForm };