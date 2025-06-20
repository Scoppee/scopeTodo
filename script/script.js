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