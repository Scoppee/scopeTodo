const darkMode = document.querySelector(".dark");
const lightMode = document.querySelector(".light");
const dialog = document.querySelector("#mydialog");
const openDialog = document.querySelector("#opendialog")
const closeDialog = document.querySelector("#closedialog")

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

openDialog.addEventListener("click", () => {
    dialog.showModal();
})

closeDialog.addEventListener("click", () => {
    dialog.close();
})



// Single Application Scripts
// Create a map that direct user to pages
const routes = {
    "/": "/pages/home.html",
    "/tasks": "/pages/tasks.html",
    "/projects": "/pages/projects.html",
    "/pomodoro": "/pages/pomodoro.html",
    "/eisenhowerMatrix": "/pages/eisenhower-matrix.html",
    "/singleProject": "/pages/single-project.html",
    "taskBoard": "/pages/task-board.html"
}

// Change the UL in the browser
const navigateTo = (url) => {
    history.pushState(null,null,url);
    renderPage();
}


// Get the current path from url, fetch the right HTML file based on the routes map
// Injects that HTML into the <main id="app"> container
const renderPage = async () => {
    const path = location.pathname
    const html = await fetch(routes[path] || routes["/"]).then((res) => res.text());
    document.querySelector("#app").innerHTML = html;
}



// Popstate: Ensure the back/forward buttons of the browser works
window.addEventListener("popstate",  renderPage)

// Intercepting Link clicks: when a link with data link is clicked, it doesnt reload thenpage
// Instead, it navigates using the navigateTo function
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.getAttribute("href"));
        }
    })
    renderPage();
})