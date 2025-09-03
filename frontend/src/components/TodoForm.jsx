import React, { useState } from "react";
import axios from "axios";

function TodoForm() {
  const [title, setTitle] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found. Please sign in first");
        return;
      }

      await axios.post(
        "http://localhost:3000/todo",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      console.log("Todo created successfully");
    } catch (e) {
      console.log("Unable to fetch data");
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md flex items-center space-x-2 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md"
      >
        <input
          type="text"
          placeholder="Add a new task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
