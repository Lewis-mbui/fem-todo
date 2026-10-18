import React, { useRef } from "react";
import useTodos from "../hooks/useTodos";
import generateId from "../utils/generateId";

const TodoInput = () => {
  const { dispatch } = useTodos();
  const todoInputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<number>(null);
  const addTodoRef = useRef<HTMLButtonElement>(null);

  const addTodo = () => {
    dispatch({
      type: "ADD",
      todo: {
        id: generateId(),
        description: todoInputRef.current!.value,
        isCompleted: false,
      },
    });

    todoInputRef.current!.value = "";
    addTodoRef.current?.classList.add("added");

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      addTodoRef.current?.classList.remove("added");
    }, 750);
  };

  const handleClick = () => {
    if (
      !todoInputRef.current ||
      !todoInputRef.current.value ||
      !addTodoRef.current
    )
      return;

    addTodo();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    if (!todoInputRef.current || !todoInputRef.current.value) return;

    addTodo();
  };

  return (
    <div className="todo-input">
      <button ref={addTodoRef} onClick={handleClick} className="add-todo">
        <span className="sr-only">Add todo</span>
      </button>
      <input
        placeholder="Create a new todo..."
        ref={todoInputRef}
        onKeyDown={handleKeyDown}
        type="text"
      />
    </div>
  );
};

export default TodoInput;
