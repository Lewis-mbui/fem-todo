import useTheme from "../hooks/useTheme";

function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <button onClick={toggleTheme}>Change theme</button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
        assumenda.
      </p>
    </>
  );
}

export default App;
