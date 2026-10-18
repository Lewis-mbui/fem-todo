import {
  createContext,
  type Dispatch,
  type ReactNode,
  useEffect,
  useReducer,
} from "react";
import { TODOS_KEY } from "../constants";
import initialTodos from "../data/todos";
import isValidTodo from "../utils/isValidTodo";
import type Todo from "../types/Todo";

type Action =
  | { type: "ADD"; todo: Todo }
  | { type: "TOGGLE"; todoId: string }
  | { type: "DELETE"; todoId: string }
  | { type: "CLEAR_COMPLETED" };
const reducer = (todos: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case "ADD":
      return [action.todo, ...todos];
    case "TOGGLE":
      return todos.map((todo) =>
        todo.id !== action.todoId
          ? todo
          : { ...todo, isCompleted: !todo.isCompleted },
      );
    case "DELETE":
      return todos.filter((t) => t.id !== action.todoId);

    case "CLEAR_COMPLETED":
      return todos.filter((t) => !t.isCompleted);
    default:
      return todos;
  }
};

interface TodoContextType {
  todos: Todo[];
  dispatch: Dispatch<Action>;
}

export const TodoContext = createContext<TodoContextType | null>(null);

interface Props {
  children: ReactNode;
}

const TodosProvider = ({ children }: Props) => {
  const initializer = (): Todo[] => {
    try {
      const saved = localStorage.getItem(TODOS_KEY);

      if (!saved) return initialTodos;

      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed) && parsed.every(isValidTodo)) return parsed;
    } catch (error) {
      return initialTodos;
    }

    return initialTodos;
  };

  const [todos, dispatch] = useReducer(reducer, undefined, initializer);
  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodosProvider;
