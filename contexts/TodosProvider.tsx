import {
  createContext,
  type Dispatch,
  type ReactNode,
  useEffect,
  useReducer,
} from "react";
import { TODOS_KEY } from "../constants";
import initialTodos from "../data/todos";

export interface Todo {
  id: string;
  description: string;
  isCompleted: boolean;
}

type Action =
  | { type: "INIT"; todos: Todo[] }
  | { type: "ADD"; todo: Todo }
  | { type: "TOGGLE"; todoId: string };

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
    const saved = localStorage.getItem(TODOS_KEY);

    if (saved) return JSON.parse(saved) as Todo[];

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
