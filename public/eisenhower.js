function populateEisenhowerMatrix(tasks) {
    const doBox = document.querySelector("#do-box div");
    const scheduleBox = document.querySelector("#schedule-box div");
    const delegateBox = document.querySelector("#delegate-box div");
    const eliminateBox = document.querySelector("#eliminate-box div");
  
    // Clear old tasks first
    // doBox.innerHTML = "";
    // scheduleBox.innerHTML = "";
    // delegateBox.innerHTML = "";
    // eliminateBox.innerHTML = "";
    
    tasks.forEach(task => {
        let taskname = document.createElement("span");
        taskname.innerHTML = `
        <span class="block det mat-task">${task.taskName}</span>
      `;
  
      const importance = task.importance; // "urg", "noturg"
      const urgency = task.priority; // "high", "medium", "low"
  
      const isImportant = importance === "Important";
      const isUrgent = urgency === "High";
  
      if (isImportant && isUrgent) {
        doBox.appendChild(taskname);
      } else if (isImportant && !isUrgent) {
        scheduleBox.appendChild(taskname);
      } else if (!isImportant && isUrgent) {
        delegateBox.appendChild(taskname);
      } else {
        eliminateBox.appendChild(taskname);
      }
    });
  }
  
  // Optional helper
  function getCategoryTitle(task) {
    const urgent = task.importance === "High";
    const important = task.priority === "Important";
    if (important && urgent) return "Do";
    if (important && !urgent) return "Schedule";
    if (!important && urgent) return "Delegate";
    return "Eliminate";
  }
  
  export { populateEisenhowerMatrix };
  