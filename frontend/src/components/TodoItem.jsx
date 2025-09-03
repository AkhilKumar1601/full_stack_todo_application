import React, { useState } from "react";
import axios from "axios";

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);

  const token = localStorage.getItem("token");

  // ✅ Update handler
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/todo/${todo._id}`,
        { title: newTitle, completed },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onUpdate(response.data);
      setIsEditing(false);
    } catch (e) {
      console.log("Error updating todo", e);
    }
  };

  // ✅ Delete handler
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/todo/${todo._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete(todo._id);
    } catch (e) {
      console.log("Error deleting todo", e);
    }
  };

  return (
    <li className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => {
            setCompleted(e.target.checked);
            handleUpdate();
          }}
          className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
        />

        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="px-2 py-1 rounded border border-gray-300 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-600 focus:outline-none"
          />
        ) : (
          <span
            className={`${
              completed
                ? "line-through text-gray-400"
                : "text-gray-900 dark:text-gray-100"
            }`}
          >
            {todo.title}
          </span>
        )}
      </div>

      <div className="space-x-2">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Edit
          </button>
        )}

        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
