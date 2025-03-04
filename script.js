document.addEventListener("DOMContentLoaded", () => {            //1
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];  //2

  tasks.forEach((task) => renderTask(task));  //6

  addTaskButton.addEventListener("click", () => { //3
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(newTask);
    console.log(tasks); 
    saveTasks();
    renderTask(newTask);
    todoInput.value = ""; //clear input
    console.log(tasks);
  });

  function renderTask(task) {  //5
    const li = document.createElement("li"); //7
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>
    `;
    li.addEventListener("click", (e) => {   //8
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {  
      e.stopPropagation(); //prevent toggle from firing
      tasks = tasks.filter((t) => t.id !== task.id);         //
      li.remove();
      saveTasks();
    });

    todoList.appendChild(li);
  }

  function saveTasks() {   //4--------------------------------------------------------
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
