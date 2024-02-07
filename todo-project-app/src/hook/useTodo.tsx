import { useState } from "react";
import { TodoType } from "../types/TodoType";
import { addTodoApi, deleteTodoApi, getAllTodosApi, updateCheckTodoApi } from "../service/todoService";
import { addTodoLocal, deleteTodoLocal, getAllTodosLocal, updateCheckTodoLocal } from "../service/todoServiceLocal";

const initialTodoForm = { id: 1, title: "", complete: false } as TodoType;

export const useTodo = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [todoForm, setTodoForm] = useState<TodoType>(initialTodoForm);

  const getTodos = async () => {
    if (import.meta.env.MODE == "staging") {
      const todos = await getAllTodosApi();
      setTodos(todos);
    } else {
      const todos = getAllTodosLocal();
      setTodos(todos);
    }
  };

  const handleAddTodo = async () => {
    if (import.meta.env.MODE == "staging") {
      const responseAddTodo = await addTodoApi(todoForm.title);
      if (responseAddTodo instanceof Error) {
        alert("Error");
      } else {
        const newTodo = {
          id: responseAddTodo?.id,
          title: responseAddTodo?.title,
          complete: responseAddTodo?.complete,
        } as TodoType;
        const newTodos = [...todos];
        newTodos.push(newTodo);
        setTodos(newTodos);
      }
    } else {
      addTodoLocal(todoForm, setTodos);
    }
    setTodoForm(initialTodoForm);
  };

  const handleRemoveTodo = async (id: number) => {
    if (import.meta.env.MODE == "staging") {
      const responseDeleteTodo = await deleteTodoApi(id);
      if (responseDeleteTodo.status === 200) {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
      } else {
        alert("Error");
      }
    } else {
      deleteTodoLocal(id, setTodos);
    }
  };

  const handleCheckTodo = async (id: number, checked: boolean) => {
    if (import.meta.env.MODE == "staging") {
      const responseUpdateCheckTodo = await updateCheckTodoApi(id, checked);
      if (responseUpdateCheckTodo.status === 200) {
        const newTodos = todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, complete: checked };
          }
          return todo;
        });
        setTodos(newTodos);
      }
    } else {
      updateCheckTodoLocal(id, checked, setTodos);
    }
  };

  return {
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
  };
};
