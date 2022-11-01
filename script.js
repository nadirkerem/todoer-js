const form = document.getElementById('form');
const todoList = document.getElementById('todo-list');
const input = document.getElementById('input');

function addNewTodo(todo) {
  const newTodo = document.createElement('li');
  newTodo.classList.add('todo-list-item');
  newTodo.innerText = input.value;
  if (todo) {
    newTodo.innerText = todo.todo;
  }
  if (todo && todo.completed) {
    newTodo.classList.add('completed');
  }
  todoList.append(newTodo);
  updateLocal();
}

function checkTodo(todo) {
  todo.classList.toggle('completed');
  updateLocal();
}

function deleteTodo(todo) {
  todo.remove();
  updateLocal();
  if (todoList.childElementCount === 0) {
    input.placeholder = 'congrats!';
    setTimeout(() => (input.placeholder = 'enter your new todo'), 3000);
  }
}

function getLocal() {
  const todoLocal = JSON.parse(localStorage.getItem('todos'));
  if (todoLocal) {
    todoLocal.forEach((todo) => addNewTodo(todo));
  }
}

function updateLocal() {
  todoItems = document.querySelectorAll('li');
  let todosArray = [];
  todoItems.forEach((todoItem) => {
    todosArray.push({
      todo: todoItem.innerText,
      completed: todoItem.classList.contains('completed'),
    });
  });
  localStorage.setItem('todos', JSON.stringify(todosArray));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!input.value) {
    input.placeholder = 'todo must have a name';
    return setTimeout(() => (input.placeholder = 'enter your new todo'), 3000);
  }
  addNewTodo();
  input.value = '';
});

todoList.addEventListener('click', function (e) {
  let todo = e.target;
  checkTodo(todo);
});

todoList.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  let todo = e.target;
  deleteTodo(todo);
});

window.onload = getLocal;
