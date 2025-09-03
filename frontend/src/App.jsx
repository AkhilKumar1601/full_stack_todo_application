import { useState } from "react";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [activePage, setActivePage] = useState("home"); // "home", "signup", "signin", "todos"

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">Todo Application</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center my-4">
        {activePage === "home" && (
          <div className="space-x-4">
            <button
              onClick={() => setActivePage("signup")}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md font-medium"
            >
              Signup
            </button>
            <button
              onClick={() => setActivePage("signin")}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md font-medium"
            >
              Signin
            </button>
          </div>
        )}

        {activePage === "signup" && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-md">
            <Signup />
            <button
              onClick={() => setActivePage("home")}
              className="mt-4 w-full py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
            >
              Back
            </button>
          </div>
        )}

        {activePage === "signin" && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-md">
            <Signin onSigninSuccess={() => setActivePage("todos")}/>
            <button
              onClick={() => setActivePage("home")}
              className="mt-4 w-full py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
            >
              Back
            </button>
          </div>
        )}

        {activePage === "todos" && (
          <div className="container mx-auto p-6 space-y-6">
            <TodoForm />
            <TodoList />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-800 py-3 text-center text-sm text-gray-700 dark:text-gray-300">
        © {new Date().getFullYear()} Todo App. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
