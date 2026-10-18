import { useState } from "react";
import type Todo from "../types/Todo";
import TodoItem from "./TodoItem";
import useTodos from "../hooks/useTodos";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface Props {
  todos: Todo[];
}

const TodoList = ({ todos }: Props) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const { dispatch } = useTodos();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Requires moving 5px before drag starts to allow clickng
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((item) => item.id === active.id);
      const newIndex = todos.findIndex((item) => item.id === over.id);
      dispatch({ type: "SET", todos: arrayMove(todos, oldIndex, newIndex) });
    }
  };

  if (!todos.length) return null;

  return (
    <div className="todos-wrapper">
      <ul role="list" className="todo-list">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={visibleTodos}
            strategy={verticalListSortingStrategy}
          >
            {visibleTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </SortableContext>
        </DndContext>
      </ul>
      <div className="todos-extras">
        <p className="todos-count" aria-live="polite">
          {" "}
          {activeItemsCount} {activeItemsCount === 1 ? "item" : "items"} left
        </p>
        <button
          className="todos-clear"
          onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
        >
          Clear Completed
        </button>
        <div className="todos-tabs" role="group" aria-label="Filter todos">
          {filters.map((f) => (
            <button
              onClick={() => setActiveFilter(f.name)}
              key={f.name}
              type="button"
              aria-pressed={activeFilter === f.name}
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
