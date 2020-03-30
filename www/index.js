import { Todos, Todo } from "wasm-todo-list";

const todos = Todos.new();

class TodoComponent extends HTMLElement {
  static get tag() {
    return "todo-component";
  }

  static get observedAttributes() {
    return ["text"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
          transition: 0.3s;
          width: 30vw;
          display: flex;
          margin: 10px;
          justify-content:space-between;
          padding: 2px 16px;
        }
        .card:hover {
          box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
        }
      </style>


      <div class="card">
        <p>${this.getAttribute('text')}</p>
        <button type="button" done>Remove</button>
      </div>
    `;

    this.doneBtn = this.shadowRoot.querySelector("[done]");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "text") {
      this.shadowRoot.innerHTML = this.shadowRoot.innerHTML.replace(oldValue, newValue);
      this.doneBtn = this.shadowRoot.querySelector("[done]");
    }
  }

  connectedCallback() {
    this.doneBtn.addEventListener("click", () => {
      todos.remove_todo(this.getAttribute("id"));
      refreshTodos();
    });
  }
}

customElements.define(TodoComponent.tag, TodoComponent);

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();

  todos.add_todo(document.getElementById("todo-name").value);
  document.getElementById("todo-name").value = "";
  refreshTodos();
});


const refreshTodos = () => {
  const nbTodos = todos.get_todos_len();
  document.getElementById("todos").innerHTML = "";

  for (let i = 0; i < nbTodos; i++) {
    const todo = todos.get_todo(i);
    const todoCmp = document.createElement("todo-component");
    todoCmp.setAttribute("text", todo.getName());
    todoCmp.setAttribute("id", i);

    document.getElementById("todos").appendChild(todoCmp);
  }
}


refreshTodos();