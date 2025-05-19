import React, { useState, useEffect } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import Filter from "./Filter";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    if (todos.length == 1) {
      localStorage.setItem("todos", JSON.stringify([]));
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-200 flex items-center justify-center p-0">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-xl">
        <div className="sticky top-0 z-10 bg-white pb-4 shadow-sm">
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-4">
            To-Do List
          </h1>
          <AddTodo onAdd={addTodo} />
          <Filter
            current={filter}
            count={filteredTodos.length}
            onChange={setFilter}
          />
        </div>

        <div className="max-h-[400px] overflow-y-auto pr-1">
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
