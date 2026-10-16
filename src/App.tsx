import useTheme from "../hooks/useTheme";
import useTodos from "../hooks/useTodos";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const { toggleTheme } = useTheme();
  const { todos } = useTodos();

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
      <TodoInput />
      <TodoList todos={todos} />
    </main>
  );
}

export default App;
