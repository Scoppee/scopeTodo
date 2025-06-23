export function initCalendar() {
    const monthYear = document.getElementById("month-year");
    const datesContainer = document.getElementById("calendar-dates");
    const prevBtn = document.getElementById("prev-month");
    const nextBtn = document.getElementById("next-month");

    if (!monthYear || !datesContainer) return; // Guard for missing elements

    let currentDate = new Date();

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        const monthName = currentDate.toLocaleString("default", { month: "long" });
        monthYear.textContent = `${monthName} ${year}`;
        datesContainer.innerHTML = "";

        for (let i = 0; i < firstDay; i++) {
            datesContainer.innerHTML += `<div class="empty"></div>`;
        }

        for (let d = 1; d <= totalDays; d++) {
            const isToday = isCurrentDate(d, month, year);
            datesContainer.innerHTML += `<div class="date${isToday ? ' today' : ''}">${d}</div>`;
        }
    }

    function isCurrentDate(d, m, y) {
        const today = new Date();
        return d === today.getDate() && m === today.getMonth() && y === today.getFullYear();
    }

    prevBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
}
