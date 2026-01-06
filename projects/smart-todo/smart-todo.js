// ---------- State ----------
let todos = [];
let lastAddedId = null;

// ---------- DOM ----------
const input = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const clearBtn = document.querySelector("#clear-btn");
const listEl = document.querySelector("#todo-list");
const counterEl = document.querySelector("#counter");
const messageEl = document.querySelector("#message");

// ---------- Helpers ----------
function normalize(str) {
  return str.trim().toLowerCase();
}

function createId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function isDuplicate(label) {
  const normalizedLabel = normalize(label);
  return todos.some((item) => normalize(item.label) === normalizedLabel);
}

// ---------- Render ----------
function render() {
  counterEl.textContent = todos.length.toString();

  const html = todos
    .map((item) => {
      const isNew = item.id === lastAddedId;

      return `
        <li class="todo-item ${isNew ? "todo-item--new" : ""}">
          <span>${item.label}</span>
          <button type="button" data-id="${item.id}" class="btn">
            ×
          </button>
        </li>
      `;
    })
    .join("");

  listEl.innerHTML = html;
}

// ---------- Actions ----------
function addTodo() {
  const value = input.value;

  if (!normalize(value)) {
    messageEl.textContent = "Type a task first.";
    return;
  }

  if (isDuplicate(value)) {
    messageEl.textContent = "This task already exists.";
    return;
  }

  const newItem = {
    id: createId(),
    label: value.trim(),
  };

  todos = [...todos, newItem];
  lastAddedId = newItem.id;
  input.value = "";
  messageEl.textContent = "";

  render();
}

function removeTodo(id) {
  todos = todos.filter((item) => item.id !== id);
  lastAddedId = null;
  render();
}

function clearAll() {
  todos = [];
  lastAddedId = null;
  messageEl.textContent = "";
  render();
}

// ---------- Events ----------
addBtn.addEventListener("click", addTodo);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

listEl.addEventListener("click", (event) => {
  const btn = event.target.closest("button[data-id]");
  if (!btn) return;

  const id = btn.dataset.id;
  removeTodo(id);
});

clearBtn.addEventListener("click", clearAll);

// Initial render
render();
