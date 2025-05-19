import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onToggle, onDelete }) => (
  <ul className="space-y-3 mt-4">
    {todos.length === 0 ? (
      <p className="text-center text-gray-500 italic"> No tasks found</p>
    ) : (
      todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))
    )}
  </ul>
);

export default TodoList;
