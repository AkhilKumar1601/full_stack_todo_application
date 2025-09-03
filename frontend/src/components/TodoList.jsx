import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:3000/todos", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTodos(response.data);
      } catch (e) {
        console.log("Unable to fetch todos", e);
      }
    };

    fetchTodos();
  }, []);

  const handleUpdateTodo = (updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
    );
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
  };
  

  return (
    <div className=" flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
          Your Todos
        </h2>

        {todos.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No todos yet. Add one!
          </p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} onUpdate={handleUpdateTodo}  onDelete={handleDelete} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TodoList;
