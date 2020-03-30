extern crate wasm_bindgen;
mod utils;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
struct Todo {
  name: String,
}

#[wasm_bindgen]
impl Todo {
  pub fn getName(&mut self) -> String {
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
    self.values.push(Todo { name });
  }  

  pub fn remove_todo(&mut self, id: usize) {
    self.values.remove(id);
  }  

  pub fn get_todo(&mut self, id:usize) -> Todo {
    let result = &self.values[id];
    Todo { name: String::from(&result.name) }
  }

  pub fn get_todos_len(&mut self) -> usize {
    self.values.len()
  }
}