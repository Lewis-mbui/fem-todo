import { type Todo } from "../contexts/TodosProvider";

const isValidTodo = (item: any): item is Todo => {
  return (
    item !== null &&
    typeof item === "object" &&
    typeof item.id === "string" &&
    typeof item.description === "string" &&
    typeof item.completed === "boolean"
  );
};

export default isValidTodo;
