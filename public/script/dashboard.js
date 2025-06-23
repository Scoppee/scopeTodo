import { initCalendar } from '../calender.js';

const tasks = [
    { name: "Website Development", description: "Landing Page", date: "Nov 17", priority: "High", status: "todo" },
    { name: "Frontend Optimization", description: "SEO Best Practices", date: "Nov 17", priority: "Low", status: "done" },
    { name: "UI Refactor", description: "Polish the dashboard UI", date: "Nov 19", priority: "Medium", status: "todo" }
];

function renderTasks(filter = "all") {
    const tbody = document.querySelector(".task-table tbody");
    tbody.innerHTML = ""; // clear

    const filtered = filter === "all" ? tasks : tasks.filter(t => t.status === filter);

    filtered.forEach((task, i) => {
        tbody.innerHTML += `
        <tr>
            <td class="task-name">
                <span class="input">
                    <input type="checkbox" ${task.status === "done" ? "checked" : ""}>
                </span>
                <div>
                    <span class="block name">${task.name}</span>
                    <span class="block description">${task.description}</span>
                </div>
            </td>
            <td>${task.date}</td>
            <td><span class="tags" id="${task.status}">${task.priority}</span></td>
        </tr>`;
    });
}

function setupTagFilters() {
    document.querySelectorAll(".progress-tags .tags").forEach(tag => {
        tag.addEventListener("click", () => {
            const filter = tag.id;
            renderTasks(filter);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderTasks(); // default all
    setupTagFilters();
    initCalendar(); // initialize calendar from calendar.js
});
