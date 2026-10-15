import { useRef } from "react";
import useTheme from "../hooks/useTheme";
import useTodos from "../hooks/useTodos";
import generateId from "../utils/generateId";

function App() {
  const { theme, toggleTheme } = useTheme();
  const { todos, dispatch } = useTodos();
  const todoInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    if (!todoInputRef.current) return;

    dispatch({
      type: "ADD",
      todo: {
        id: generateId(),
        description: todoInputRef.current.value,
        isCompleted: false,
      },
    });

    todoInputRef.current.value = "";
  };

  return (
    <main className="app">
      <header className="header">
        <a href="/">
          <img
            className="header__logo"
            src="/images/logo.png"
            alt="Todo Logo"
          />
        </a>
        <button className="theme-toggler" onClick={toggleTheme}>
          <span className="sr-only">Toggle Theme</span>
        </button>
      </header>
      <input ref={todoInputRef} onKeyDown={handleKeyDown} type="text" />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.description}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;
