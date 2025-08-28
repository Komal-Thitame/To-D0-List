const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const dueDateInput = document.getElementById("dueDate");
const priorityInput = document.getElementById("priority");

// Add task
function addTask() {
  if (taskInput.value.trim() === '') {
    alert("Please enter a task!");
    return;
  }

  let li = document.createElement("li");
  li.classList.add(priorityInput.value); // priority color

  let dueDate = dueDateInput.value ? ` (Due: ${dueDateInput.value})` : "";

  li.innerHTML = `
    <span class="text">${taskInput.value}</span>
    <div class="meta">Priority: ${priorityInput.value}${dueDate}</div>
    <span class="delete">✖</span>
  `;

  taskList.appendChild(li);

  saveData();
  taskInput.value = "";
  dueDateInput.value = "";
  priorityInput.value = "medium";
}

// Mark complete / delete
taskList.addEventListener("click", function(e) {
  if (e.target.classList.contains("text")) {
    e.target.parentElement.classList.toggle("checked");
    saveData();
  } else if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    saveData();
  }
});

// Save to local storage
function saveData() {
  localStorage.setItem("tasks", taskList.innerHTML);
}

// Load tasks
function loadData() {
  taskList.innerHTML = localStorage.getItem("tasks") || "";
}
loadData();

// Filter
function filterTasks(type) {
  let tasks = taskList.getElementsByTagName("li");
  for (let task of tasks) {
    switch(type) {
      case "all":
        task.style.display = "block";
        break;
      case "completed":
        task.style.display = task.classList.contains("checked") ? "block" : "none";
        break;
      case "pending":
        task.style.display = task.classList.contains("checked") ? "none" : "block";
        break;
    }
  }
}

// Search
function searchTask() {
  let query = document.getElementById("searchBox").value.toLowerCase();
  let tasks = taskList.getElementsByTagName("li");
  for (let task of tasks) {
    let text = task.querySelector(".text").textContent.toLowerCase();
    task.style.display = text.includes(query) ? "block" : "none";
  }
}

// Clear All
function clearAll() {
  taskList.innerHTML = "";
  saveData();
}

// Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}