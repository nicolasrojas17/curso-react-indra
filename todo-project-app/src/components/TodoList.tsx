import { useEffect, useRef, useState } from "react";
import { TodoType } from "../types/TodoType";
import Todo from "./Todo";
import { TodoSearch } from "./TodoSearch";

interface PropsTodoList {
  todos: TodoType[];
  setTodos: (todos: TodoType[]) => void;
  searchValue: string;
  setSearchValue: (todo: string) => void;
  handleRemoveTodo: (id: number) => void;
  handleCheckTodo: (id: number, checked: boolean) => void;
}

export const TodoList = ({
  todos,
  setTodos,
  searchValue,
  setSearchValue,
  handleRemoveTodo,
  handleCheckTodo,
}: PropsTodoList) => {
  const [todosFiltered, setTodosFiltered] = useState<TodoType[]>([]);

  const updateTodosFiltered = () => {
    const filtered = todos.filter((todo) => todo.title.toLowerCase().includes(searchValue.toLowerCase()));
    setTodosFiltered(filtered);
  };

  useEffect(() => {
    updateTodosFiltered();
  }, [searchValue, todos]);

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
      <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
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
          {todosFiltered
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
