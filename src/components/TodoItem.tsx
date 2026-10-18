import type Todo from "../types/Todo";
import useTodos from "../hooks/useTodos";
import { useSortable } from "@dnd-kit/sortable";
import type { CSSProperties } from "react";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  todo: Todo;
}

const TodoItem = ({ todo }: Props) => {
  const { dispatch } = useTodos();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      className={`todo-item ${todo.isCompleted ? "crossed" : ""}`}
      ref={setNodeRef}
      style={style}
    >
      <button type="button" className="drag-btn" {...attributes} {...listeners}>
        ⋮⋮
      </button>
      <input
        id={`todo-${todo.id}`}
        checked={todo.isCompleted}
        onChange={() => dispatch({ type: "TOGGLE", todoId: todo.id })}
        type="checkbox"
      />
      <label htmlFor={`todo-${todo.id}`}>{todo.description}</label>
      <button
        className="delete-todo"
        onClick={() => dispatch({ type: "DELETE", todoId: todo.id })}
        aria-label={`Delete ${todo.description}`}
      ></button>
    </li>
  );
};

export default TodoItem;
