import { getProjects } from './projectForm.js';

function populateProjectDropdown() {
  const select = document.querySelector("#project"); // Ensure your select has id="project"
  if (!select) return;

  const projects = getProjects();
  select.innerHTML = ""; // Clear existing options

  // Optional default placeholder
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.textContent = "Select a project";
  select.appendChild(defaultOption);

  projects.forEach(project => {
    const option = document.createElement("option");
    option.value = project.name;
    option.textContent = project.name;
    select.appendChild(option);
  });
}

export { populateProjectDropdown };
