import type { Todo } from "../../contexts/TodosProvider";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
}

const TodoList = ({ todos }: Props) => {
  return (
    <div className="todos-wrapper">
      <ul role="list" className="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <div className="todos-extras">
        <p className="todos-count">{`${todos.length} items left`}</p>
        <button className="todos-clear">Clear Completed</button>
        <div className="todos-tabs">
          <button className="todo-tab">All</button>
          <button className="todo-tab">Active</button>
          <button className="todo-tab">Completed</button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
