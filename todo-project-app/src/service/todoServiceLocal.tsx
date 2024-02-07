import { todoList } from "../data/todo";
import { TodoType } from "../types/TodoType";

export const getAllTodosLocal = (): TodoType[] => {
  return JSON.parse(sessionStorage.getItem("todos")!) || sessionStorage.setItem("todos", JSON.stringify(todoList));
};

export const updateCheckTodoLocal = async (id: number, complete: boolean, setTodos: (todos: TodoType[]) => void) => {
  const todos = getAllTodosLocal();
  const newTodos = todos.map((todo: any) => {
    if (todo.id === id) {
      return { ...todo, complete };
    }
    return todo;
  });
  sessionStorage.setItem("todos", JSON.stringify(newTodos));
  setTodos(newTodos);
};

export const addTodoLocal = async (todoForm: TodoType, setTodos: (todos: TodoType[]) => void) => {
  const todos = getAllTodosLocal();
  const newTodos = [...todos, { ...todoForm, id: new Date().getTime() }];
  sessionStorage.setItem("todos", JSON.stringify(newTodos));
  setTodos(newTodos);
};

export const deleteTodoLocal = async (id: number, setTodos: (todos: TodoType[]) => void) => {
  const todos = getAllTodosLocal();
  const newTodos = todos.filter((todo) => todo.id !== id);
  sessionStorage.setItem("todos", JSON.stringify(newTodos));
  setTodos(newTodos);
};
