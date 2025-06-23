import { getProjects } from './projectForm.js';

function renderProjectList(projects) {
  const projectContainer = document.querySelector("#project-container");
//   const inProgressTable = document.querySelector("#inprogress-body");
//   const doneTable = document.querySelector("#done-body");

  projectContainer.innerHTML = "";
//   inProgressTable.innerHTML = "";
//   doneTable.innerHTML = "";

projects.forEach((project, index) => {
    const card = document.createElement("div");
    card.classList.add("card", "project-card");

    // let priorityId = task.priority === "High" ? "todo" :
    //                  task.priority === "Medium" ? "inprogress" : "done";
    card.dataset.project = project.name;

    card.innerHTML = `
      <span class="block title">${project.name}</span>
        <div class="progress-tags task-board-priority">
            <span class="tags" id="done">${project.importance}</span>
        </div>
      <span class="block det">${project.description}</span>
    `;

    
    projectContainer.appendChild(card);

  });

  // ✅ Add click event to each project card
  document.querySelectorAll(".project-card").forEach(link => {
    link.addEventListener("click", () => {
      const projectName = link.dataset.project;
      localStorage.setItem("activeProject", projectName);
      window.location.href = "./singleProject"; // Adjust path if needed
    })
    });

//   addEventListeners();
}

export { renderProjectList };
