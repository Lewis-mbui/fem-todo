import { useState } from "react";
import type Todo from "../../types/Todo";
import TodoItem from "./TodoItem";
import useTodos from "../../hooks/useTodos";

interface Props {
  todos: Todo[];
}

const TodoList = ({ todos }: Props) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const { dispatch } = useTodos();

  const filters = [
    { name: "all", description: "All" },
    { name: "active", description: "Active" },
    { name: "completed", description: "Completed" },
  ] as const;

  let activeItemsCount = todos.filter((t) => !t.isCompleted).length;

  const visibleTodos = todos.filter((todo) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "active" && !todo.isCompleted) return true;
    if (activeFilter === "completed" && todo.isCompleted) return true;
  });

  if (!todos.length) return null;

  return (
    <div className="todos-wrapper">
      <ul role="list" className="todo-list">
        {visibleTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <div className="todos-extras">
        <p className="todos-count">{`${activeItemsCount} items left`}</p>
        <button
          className="todos-clear"
          onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
        >
          Clear Completed
        </button>
        <div className="todos-tabs">
          {filters.map((f) => (
            <button
              onClick={() => setActiveFilter(f.name)}
              key={f.name}
              className={`todo-tab ${activeFilter === f.name ? "active" : ""}`}
            >
              {f.description}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
