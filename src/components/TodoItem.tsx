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
        checked={todo.isCompleted}
        onChange={() => dispatch({ type: "TOGGLE", todoId: todo.id })}
        type="checkbox"
      />
      <p>{todo.description}</p>
      <button
        className="delete-todo"
        onClick={() => dispatch({ type: "DELETE", todoId: todo.id })}
      >
        <span className="sr-only">Delete todo Item</span>
      </button>
    </li>
  );
};

export default TodoItem;
