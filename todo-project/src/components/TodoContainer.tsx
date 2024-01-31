import { useState } from "react";
import { getAllTodos } from "../service/todoService";
import { TodoType } from "../types/TodoType";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";

const initialTodos = getAllTodos();
const initialTodoForm = { id: 1, title: "", complete: false } as TodoType;

export const TodoContainer = () => {
  const [todos, setTodos] = useState<TodoType[]>(initialTodos);

  const [todoForm, setTodoForm] = useState<TodoType>(initialTodoForm);

  const handleAddTodo = () => {
    setTodos([...todos, { ...todoForm, id: new Date().getTime() }]);
    setTodoForm(initialTodoForm);
  };

  const handleRemoveTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleCheckTodo = (id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, complete: !todo.complete };
      }
      return todo;
    });
    setTodos(newTodos);
  };
  return (
    <section className="container">
      <h1 className="title">My Todos</h1>

      <TodoForm handleAddTodo={handleAddTodo} setTodoForm={setTodoForm} todoForm={todoForm} />

      <TodoList
        todos={todos}
        setTodos={setTodos}
        handleRemoveTodo={handleRemoveTodo}
        handleCheckTodo={handleCheckTodo}
      />
    </section>
  );
};
