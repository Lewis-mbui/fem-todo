import { useContext } from "react";
import { TodoContext } from "../contexts/TodosProvider";

const useTodos = () => {
  const ctx = useContext(TodoContext);

  if (!ctx) throw new Error("Value for Todos context is undefined");

  return ctx;
};

export default useTodos;
