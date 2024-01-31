import { todoList } from "../data/todo";
import { TodoType } from "../types/TodoType";

export const getAllTodos = (): TodoType[] => {
  return todoList;
};
