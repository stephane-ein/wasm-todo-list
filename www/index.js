import { Todos } from "wasm-todo-list";

/**
 * Todo UI component
 */
export class TextComponent extends HTMLElement {
  static get tag() {
    return "text-component";
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
        }

        .card:hover {
          box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
        }

        .container {
          padding: 2px 16px;
        }
    </style>

    <div class="card container">
      <p>${this.getAttribute('text')}</p>
      <button type="button" done>Remove</button>
    </div>
    `;

    this.doneBtn = this.shadowRoot.querySelector('[done]');
    this.doneTodo = this.doneTodo.bind(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "text") {
      this.shadowRoot.innerHTML = this.shadowRoot.innerHTML.replace(oldValue, newValue);
      this.doneBtn = this.shadowRoot.querySelector('[done]');
    }
  }

  connectedCallback() {
    this.doneBtn.addEventListener('click', this.doneTodo);
  }

  doneTodo() {
    todos.remove_todo(this.getAttribute("id"));
    refreshTodos();
  }
}

customElements.define(TextComponent.tag, TextComponent);


/**
 * Refresh todo function
 */
const refreshTodos = () => {
  const nbTodos = todos.get_todos_len();

  document.getElementById("todos").innerHTML = "";

  for (let i = 0; i < nbTodos; i++) {
    const todo = todos.get_todo(i);
    const text1 = document.createElement("text-component");
    text1.setAttribute("text", todo.getName());
    text1.setAttribute("id", i);
    document.getElementById("todos").appendChild(text1);
  }
}

const todos = Todos.new();
todos.add_todo("alpha");
todos.add_todo("bravo");

refreshTodos();

/**
 * Add form listner
 */
const form = document.getElementById("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  todos.add_todo(document.getElementById("todo-name").value);
  document.getElementById("todo-name").value = "";
  refreshTodos();
})