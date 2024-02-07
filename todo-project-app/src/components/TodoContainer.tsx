import { useEffect } from "react";
import { useTodo } from "../hook/useTodo";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";

export const TodoContainer = () => {
  const {
    todos,
    setTodos,
    todoForm,
    setTodoForm,
    searchValue,
    setSearchValue,
    getTodos,
    handleAddTodo,
    handleRemoveTodo,
    handleCheckTodo,
  } = useTodo();

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <section className="container">
      <h1 className="title">My Todos</h1>

      <TodoForm handleAddTodo={handleAddTodo} setTodoForm={setTodoForm} todoForm={todoForm} />
      {todos?.length > 0 ? (
        <TodoList
          todos={todos}
          setTodos={setTodos}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleRemoveTodo={handleRemoveTodo}
          handleCheckTodo={handleCheckTodo}
        />
      ) : (
        <h1>Error obteniendo lista de todos</h1>
      )}
    </section>
  );
};
