document.addEventListener("DOMContentLoaded", loadTask);

const taskForm = document.getElementById("Task-Form");
const taskInput = document.getElementById("Task-Input");
const taskList = document.getElementById("Task-List");

taskForm.addEventListener("submit", addTask);
taskList.addEventListener("click", handleTaskClick);

function loadTask() {
  const tasks = JSON.parse(localStorage.getItem("task")) || [];
  tasks.forEach(task => createTaskElement(task));
}

function addTask(e) {
  e.preventDefault();
  const taskText = taskInput.value;
  if (taskText === '') return;
  createTaskElement(taskText);
  saveTask(taskText);
  taskInput.value = '';
}

function createTaskElement(taskText) {
  const li = document.createElement("li");

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add('edit-btn');

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Del";
  deleteBtn.classList.add('delete-btn');

  li.appendChild(taskSpan);
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);
  taskList.appendChild(li);
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem('task')) || [];
  tasks.push(task);
  localStorage.setItem('task', JSON.stringify(tasks));
}

function handleTaskClick(e) {
  if (e.target.classList.contains('delete-btn')) {
    const taskItem = e.target.parentElement;
    const taskText = taskItem.querySelector('span').textContent;
    const newTaskDel = prompt("Are You Sure You Want To Delete", taskText)
    deleteTask(newTaskDel);
    taskItem.remove();
  }

  if (e.target.classList.contains("edit-btn")) {
    const taskItem = e.target.parentElement;
    const taskText = taskItem.querySelector("span").textContent;
    const newTaskText = prompt("Edit Your Information", taskText);
    if (newTaskText !== null && newTaskText !== '') {
      taskItem.querySelector("span").textContent = newTaskText;
      updateTask(taskText, newTaskText);
    }
  }
}

function deleteTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("task")) || [];
  tasks = tasks.filter(task => task !== taskText);
  localStorage.setItem('task', JSON.stringify(tasks));
}

function updateTask(oldTaskText, newTaskText) {
  const tasks = JSON.parse(localStorage.getItem("task")) || [];
  const taskIndex = tasks.indexOf(oldTaskText);
  if (taskIndex >= 0) {
    tasks[taskIndex] = newTaskText;
    localStorage.setItem('task', JSON.stringify(tasks));
  }
}
