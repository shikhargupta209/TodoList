const input = document.getElementById("takeInput");
const addButton = document.getElementById("addTask");
const inputContainer = document.getElementById("inputBox");
const taskList = document.getElementById("taskList");
const taskCountWatch = document.getElementById("taskCount");
const checkAlltaskButton = document.getElementById('checkAllTasks');
const clearCheckedTaskButton = document.getElementById('clearCheckedTasks');
const tasksFilterButtons = document.querySelectorAll('#showCompletedButtons span');
const allTaskButton = document.getElementById('allTaskButton');
const uncompleteTaskButton = document.getElementById('uncompleteTaskButton');
const completedTaskButton = document.getElementById('completedTaskButton');

function setTaskCount() {
  var numberOfTasks = taskList.childElementCount;
  taskCountWatch.innerHTML = numberOfTasks;
}

// set initial count of task
setTaskCount();

// input events show/hide add button, inputfield bg color change
input.addEventListener("input", function (e) {
  if (e.target.value != "") {
    addButton.classList.remove("addTask");
  } else {
    addButton.classList.add("addTask");
  }
});

input.addEventListener("focus", function (e) {
  inputContainer.classList.add("inputBoActiveBg");
});

input.addEventListener("blur", function (e) {
  inputContainer.classList.remove("inputBoActiveBg");
});

// top navigations
  // check all task
checkAlltaskButton.addEventListener('click', () => {
  var allTasks = taskList.querySelectorAll(".taskCheckBox");

  allTasks.forEach((task) => {
     task.checked = true;
  })
})
    // clear check tasks
clearCheckedTasks.addEventListener('click', () => {
  var allTasks = taskList.querySelectorAll(".taskCheckBox");

  allTasks.forEach((task) => {
    if (task.checked) {
      const taskDiv = task.closest('.task');
      taskDiv.remove();
      setTaskCount();
    }
  })
})

// add task
addButton.onclick = () => {
  // make new element on click
  var newTask = document.createElement("div");
  newTask.classList.add("task");
  var text = input.value;
  // check if input is not empty
  if (text != "") {
    //   insert element
    newTask.innerHTML = `
            <input class="taskCheckBox" type="checkbox">
            <span>${text}</span>
            <i class="fa-regular fa-circle-xmark deleteButton"></i>
    `;

    taskList.appendChild(newTask);
    //   update count
    setTaskCount();
  }
  // clear value and hide add button
  input.value = "";
  addButton.classList.add("addTask");
};

// delete tasks
taskList.addEventListener("click", function (event) {
  // Check if click element has deleteButton
  if (event.target.classList.contains("deleteButton")) {
    // Find and remove the closest parent with the task
    var taskElement = event.target.closest(".task");
    if (taskElement) {
      taskList.removeChild(taskElement);
      //   update count
      setTaskCount();
    }
  }
});

// hightlight filter task buttons
tasksFilterButtons.forEach(item => {
    item.addEventListener('click', () => {
        // Remove the 'highlight' class from all divs
        tasksFilterButtons.forEach(item => item.classList.remove('highlight'));
        
        // Add the 'highlight' class to the clicked div
        item.classList.add('highlight');
    });
});

// show All task
allTaskButton.addEventListener('click', () => {
  var allTasks = taskList.querySelectorAll(".taskCheckBox");
  allTasks.forEach((task) => {
    const taskDiv = task.closest('.task');
      taskDiv.classList.remove("taskHide");
  })
});

// show uncomplete tasks
uncompleteTaskButton.addEventListener('click', () => {
  var allTasks = taskList.querySelectorAll(".taskCheckBox");
  allTasks.forEach((task) => {
    const taskDiv = task.closest('.task');
    if (task.checked) {
      taskDiv.classList.add("taskHide");
    } else {
      taskDiv.classList.remove("taskHide");
    }
  })
});

// show completed tasks
completedTaskButton.addEventListener('click', () => {
  var allTasks = taskList.querySelectorAll(".taskCheckBox");
  allTasks.forEach((task) => {
    const taskDiv = task.closest('.task');
    if (!task.checked) {
      taskDiv.classList.add("taskHide");
    } else {
      taskDiv.classList.remove("taskHide");
    }
  })
});




