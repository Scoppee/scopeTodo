import { renderProjectList } from "./projectListUI.js";
// Constructor function
function Project(name, description, importance) {
    this.name = name;
    this.description = description;
    this.importance = importance;
    this.createdAt = new Date().toISOString();
  }
  
  // Setup function to handle the form logic
  function setupProjectForm() {
    const form = document.getElementById("projectform");
    const submitBtn = document.getElementById("submitProject");
    const dialog = document.getElementById("myprojectdialog");
  
    if (!form || !submitBtn || !dialog) return;
  
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
  
      if (form.checkValidity()) {
        const formData = new FormData(form);
  
        const project = new Project(
          formData.get("projectName"),
          formData.get("projectDescription").trim(),
          formData.get("importance")
        );
  
        console.log("✅ Project Created:", project);
  
        // Optional: Save to localStorage
        const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        savedProjects.push(project);
        localStorage.setItem("projects", JSON.stringify(savedProjects));
        
        const allProjects = getProjects()
      renderProjectList(allProjects);

        form.reset();
        dialog.close();
      } else {
        form.reportValidity();
      }
    });
  }


  function getProjects() {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    return projects;
  }
  
  // ✅ Export the setup function
  export { setupProjectForm, getProjects };
  