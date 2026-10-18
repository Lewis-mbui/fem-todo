import type Todo from "../types/Todo";
import useTodos from "../hooks/useTodos";

interface Props {
  todo: Todo;
}

const TodoItem = ({ todo }: Props) => {
  const { dispatch } = useTodos();

  return (
    <li className={`todo-item ${todo.isCompleted ? "crossed" : ""}`}>
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
