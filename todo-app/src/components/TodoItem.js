import React from "react";

const TodoItem = ({ todo, onToggle, onDelete }) => (
  <li className="flex items-center justify-between bg-gray-50 border rounded-lg px-4 py-2 shadow hover:shadow-md transition">
    <span
      onClick={() => onToggle(todo.id)}
      className={`flex-grow cursor-pointer select-none text-lg text-transform: capitalize ${
        todo.completed
          ? "line-through text-gray-400"
          : "text-gray-800 hover:text-indigo-600"
      }`}>
      {todo.text}
    </span>
    <button
      onClick={() => onDelete(todo.id)}
      className="text-red-500 hover:text-red-700 ml-3 transition text-xl"
      title="Delete">
      &times;
    </button>
  </li>
);

export default TodoItem;
