extern crate wasm_bindgen;
mod utils;
use wasm_bindgen::prelude::*;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

#[wasm_bindgen]
struct Todo {
  name: String,
}

#[wasm_bindgen]
impl Todo {
  pub fn getName(&self) -> String {
    let result = String::from(&self.name);
    result
  }
}

#[wasm_bindgen]
struct Todos {
  values: Vec<Todo>,
}

#[wasm_bindgen]
impl Todos {
  pub fn new() -> Todos {
    let values = Vec::new();
    Todos { values }
  }

  pub fn add_todo(&mut self, name: String) {
    log!("Added todo with name {}", name);
    self.values.push(Todo { name });
  }

  pub fn remove_todo(&mut self, i: usize) {
    log!("Removed todo at index {}", i);
    self.values.remove(i);
  }

  pub fn display_todos(&mut self) -> String {
    let mut result = String::new();
    for todo in &self.values {
      result.push_str(&format!(
        "{}",
        &todo.name.to_string()
      ));
    }

    println!("Size {}", result);

    result
  }

  pub fn get_todo(&self, id: usize) -> Todo {
    let result = &self.values[id];
    Todo {name: String::from(&result.name)}
  }

  pub fn get_todos_len(&self) -> usize {
    self.values.len()
  }
}