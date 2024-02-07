import { useRef } from "react";
import { TodoType } from "../types/TodoType";
import Todo from "./Todo";

interface PropsTodoList {
  todos: TodoType[];
  setTodos: (todos: TodoType[]) => void;
  handleRemoveTodo: (id: number) => void;
  handleCheckTodo: (id: number, checked: boolean) => void;
}

export const TodoList = ({ todos, setTodos, handleRemoveTodo, handleCheckTodo }: PropsTodoList) => {
  const dragTodo = useRef<number>(0);
  const draggedOverTodo = useRef<number>(0);

  const handleSort = () => {
    const todosClone = [...todos];
    const temp = todosClone[dragTodo.current];
    todosClone[dragTodo.current] = todosClone[draggedOverTodo.current];
    todosClone[draggedOverTodo.current] = temp;
    setTodos(todosClone);
  };

  return (
    <div className="datatable-container">
      <table className="datatable">
        <thead>
          <tr>
            <th></th>
            <th>Status</th>
            <th>Tarea</th>
            <th>Eliminar tarea</th>
          </tr>
        </thead>
        <tbody>
          {todos
            .map((_val, index, array) => array[array.length - 1 - index])
            .map((todo, index) => (
              <tr
                key={todo.id}
                draggable
                onDragStart={() => (dragTodo.current = index)}
                onDragEnter={() => (draggedOverTodo.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
              >
                <Todo todo={todo} handleRemoveTodo={handleRemoveTodo} handleCheckTodo={handleCheckTodo} />
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
