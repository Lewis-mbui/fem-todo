import type Todo from "../types/Todo";

const isValidTodo = (item: any): item is Todo => {
  return (
    item !== null &&
    typeof item === "object" &&
    typeof item.id === "string" &&
    typeof item.description === "string" &&
    typeof item.isCompleted === "boolean"
  );
};

export default isValidTodo;
