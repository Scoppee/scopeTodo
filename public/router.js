import { getTasks } from "./taskForm.js";
import { setupTaskForm } from "./taskForm.js";
import { getProjects, setupProjectForm } from './projectForm.js';
import { renderTaskList } from "./taskListUI.js";
import { renderProjectList } from "./projectListUI.js";
import { renderTaskBoard } from "./taskBoardUI.js";
import { setupPomodoro } from "./pomodoro.js";
import { populateEisenhowerMatrix } from "./eisenhower.js";
import { renderSingleProjectTasks } from "./singleProject.js";
// Single Application Scripts
// Create a map that direct user to pages
const routes = {
    "/": "/pages/index.html", 
    "/tasks": "/pages/tasks.html",
    "/projects": "/pages/projects.html",
    "/pomodoro": "/pages/pomodoro.html",
    "/eisenhowerMatrix": "/pages/eisenhower-matrix.html",
    "/singleProject": "/pages/single-project.html",
    "/taskBoard": "/pages/task-board.html"
}

// Change the UL in the browser
const navigateTo = (url) => {     // This is called when a link is clicked
    history.pushState(null,null,url); //Updates the browsers address bar without reloading the page    
    renderPage();   //After updating the url, it loads the new page content
}


// Get the current path from url, fetch the right HTML file based on the routes map
// Injects that HTML into the <main id="app"> container
const renderPage = async () => {   //
    const path = location.pathname  //This gets the URL path Name and save it in paths so we know what page to load
    const html = await fetch(routes[path] || routes["/"]).then((res) => res.text()); //Loads the html file as text content
    document.querySelector("#app").innerHTML = html;  //Selects the main id=app in the index and replaces its content with html declared up

    const tasks = getTasks();
    const projects = getProjects();

    if (document.querySelector("#todo-body")) {
        renderTaskList(tasks);
    }
    if (document.querySelector("#inprogress-body")) {
        renderTaskList(tasks);
    }
    if (document.querySelector("#done-body")) {
        renderTaskList(tasks);
    }

    if (document.querySelector("#taskboard-table-body")) {
        renderTaskBoard(tasks);
    }
    // Open Add Task Dialog
    if (document.getElementById("mydialog")) {
        setupTaskForm();
    }
    // Open Add Project Dialog
    if (document.getElementById("projectform")) {
    setupProjectForm();
    }


    openTaskDialogue();

    openProjectDialogue();

    

    // Inside your renderPage or switch statement for pomodoro:
    if (path === "/pomodoro") {
    setupPomodoro(); // initialize the pomodoro timer once page is rendered
    }

    if (path === "/eisenhowerMatrix") {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        populateEisenhowerMatrix(tasks);
    }

    if (path === "/projects") {
        renderProjectList(projects);
    }


    if (path === "/singleProject") {
        renderSingleProjectTasks();
    }


}

function openTaskDialogue(){
    const dialog = document.querySelector("#mydialog");
    const openDialog = document.querySelector("#opendialog");
    const closeDialog = document.querySelector("#closedialog");
    
    if(!openDialog) return; 

    if (dialog  && openDialog) {
        openDialog.addEventListener("click", () => {
            dialog.showModal();
        });
    
    
        closeDialog.addEventListener("click", () => {
            dialog.close();
        });
    }
}


function openProjectDialogue() {
    const dialogProject = document.querySelector("#myprojectdialog");
    const openProjectDialog = document.querySelector("#openprojectdialog");
    const closeProjectDialog = document.querySelector("#closeprojectdialog");

    if(!openProjectDialog) return; 

    openProjectDialog.addEventListener("click", () => {
        dialogProject.showModal();
    });


    closeProjectDialog.addEventListener("click", () => {
        dialogProject.close();
});
}


// Popstate: Ensure the back/forward buttons of the browser works
window.addEventListener("popstate",  renderPage)

// Intercepting Link clicks: when a link with data link is clicked, it doesnt reload thenpage
// Instead, it navigates using the navigateTo function
document.addEventListener("DOMContentLoaded", () => { //Waits until the entire html page has loaded
    document.body.addEventListener("click", (e) => {  //Adds a global listener to the whole page
        if (e.target.matches("[data-link]")) {  //If the clicked element is a link with the attribute data-link
            e.preventDefault();        //Prevent default behaviour
            navigateTo(e.target.getAttribute("href")); 
            console.log(e.target.getAttribute("href"))  //Passes it to the navigateTo function
        }
    })


    renderPage();   
})