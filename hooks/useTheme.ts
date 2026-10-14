import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeProvider";

const useTheme = () => {
  const ctx = useContext(ThemeContext);

  if (!ctx) throw new Error("No value provided for theme");

  return ctx;
};

export default useTheme;
