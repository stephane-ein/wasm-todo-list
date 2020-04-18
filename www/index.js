import { Todos, Todo } from "wasm-todo-list";

class TodoComponent extends HTMLElement {
  static get tag() {
    return "todo-component";
  }

  static get observedAttributes(){
    return ["text"];
  }

  constructor() {
    super();

    this.attachShadow({mode: "open"});

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
    if(name === "text") {
      this.shadowRoot.innerHTML = this.shadowRoot.innerHTML.replace(oldValue, newValue);
      this.doneBtn = this.shadowRoot.querySelector("[done]");
    }
  }

  connectedCallback() {
    this.doneBtn.addEventListener("click", () => {
      // Todo call Rust method
    });
  }
}

customElements.define(TodoComponent.tag, TodoComponent);