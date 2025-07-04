const darkMode = document.querySelector(".dark");
const lightMode = document.querySelector(".light");


darkMode.addEventListener("click", () => {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark")
})

lightMode.addEventListener("click", () => {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light")
})

window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
})





  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("taskForm");
    const submitBtn = document.getElementById("submitTask");
    const dialog = document.getElementById("mydialog");
  
    submitBtn.addEventListener("click", () => {
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
  
        // Optional: Save to localStorage
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
  
        form.reset();
        dialog.close();
      } else {
        form.reportValidity(); // Show validation errors
      }
    });
  });
  
  








