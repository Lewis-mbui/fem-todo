import useTheme from "../hooks/useTheme";

function App() {
  const { theme, toggleTheme } = useTheme();
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
    </main>
  );
}

export default App;
