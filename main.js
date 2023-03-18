var todos = JSON.parse(localStorage.getItem("todos")) || [];
const todo_list = document.querySelector(`#todo-list`);
const nameInput = document.querySelector(`#name`);
const username = localStorage.getItem(`user`) || "";
const new_todo_form = document.querySelector(`#new-todo-form`);

new_todo_form.addEventListener("submit", update_todo_list);

populatelist();

nameInput.value = username;
nameInput.addEventListener("change", (e) => {
  localStorage.setItem("user", e.target.value);
});

function update_todo_list(e) {
  e.preventDefault();
  if (!e.target.elements.content.value) {
    e.target.elements.content.placeholder = "Please provide a task";
    e.target.classList.add("error");
  } else if(!e.target.elements.category.value) {
    e.target.elements.content.value = "";
    e.target.elements.content.placeholder = "Please select a category";
    e.target.classList.add("error");
  } else {
    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      status: false,
    };
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    populatelist();
    e.target.elements.content.placeholder = "e.g. Get some milk";
    e.target.classList.remove("error");
    e.target.reset();
  }
}

function populatelist() {
  todo_list.innerHTML =``;
  if (todos) {
    todos.forEach((todo) => {
      const todoItem = document.createElement("div");
      todoItem.classList.add("todo-item");

      const label = document.createElement("label");
      const input1 = document.createElement("input");
      const input2 = document.createElement("input");
      const span = document.createElement("span");
      const content = document.createElement("div");
      const actions = document.createElement("div");
      const edit = document.createElement("button");
      const deleteButton = document.createElement("button");

      label.appendChild(input1);
      label.appendChild(span);

      input1.type = "checkbox";
      input1.checked = todo.status;
      if (todo.status) {
        todoItem.classList.add("completed");
      }

      span.classList.add("bubble");
      span.classList.add(todo.category);

      content.classList.add("todo-content");
      content.appendChild(input2);

      input2.type = "text";
      input2.value = todo.content;
      input2.setAttribute("readonly", true);

      actions.classList.add("actions");
      actions.appendChild(edit);
      actions.appendChild(deleteButton);

      edit.classList.add("edit");
      deleteButton.classList.add("delete");

      edit.innerText = "EDIT";
      deleteButton.innerText = "DELETE";

      todoItem.appendChild(label);
      todoItem.appendChild(content);
      todoItem.appendChild(actions);
      todo_list.appendChild(todoItem);

      input1.addEventListener("click", () => {
        if (!todo.status) {
          todoItem.classList.add("completed");
        } else {
          todoItem.classList.remove("completed");
        }
        todo.status = !todo.status;
        localStorage.setItem("todos", JSON.stringify(todos));
      });

      edit.addEventListener("click", () => {
        if (input2.readOnly) {
          input2.readOnly = false;
          input2.focus();
          edit.innerText = "SAVE";
          todoItem.classList.add("editing");
        } else {
          input2.readOnly = true;
          edit.innerText = "EDIT";
          todo.content = input2.value;
          todoItem.classList.remove("editing");
          localStorage.setItem("todos", JSON.stringify(todos));
        }
      });

      deleteButton.addEventListener("click", () => {
        todos = todos.filter((t) => t != todo);
        todoItem.remove();
        localStorage.setItem("todos", JSON.stringify(todos));
      });
    });
  }
}
