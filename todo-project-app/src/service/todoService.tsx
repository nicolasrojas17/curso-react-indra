import { todoList } from "../data/todo";
import { TodoType } from "../types/TodoType";

const URL = "http://localhost:8080";

export const getAllTodosApi = async (): Promise<TodoType[]> => {
  return await fetch(`${URL}/todos`)
    .then((res) => res.json())
    .catch((error: any) => {
      console.error(error);
      return todoList;
    });
};

export const updateCheckTodoApi = async (id: number, complete: boolean): Promise<Response> => {
  return await fetch(`${URL}/todos/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ complete }),
  })
    .then((response: any) => response)
    .catch((error: any) => {
      console.error(error);
      return new Error();
    });
};

export const addTodoApi = async (title: string): Promise<any> => {
  return await fetch(`${URL}/todos/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  })
    .then((response: any) => {
      return response.status === 200 ? response.json() : response;
    })
    .catch((error: any) => {
      console.error(error);
      return new Error();
    });
};

export const deleteTodoApi = async (id: number): Promise<Response> => {
  return await fetch(`${URL}/todos/delete/${id}`, { method: "DELETE" })
    .then((response: any) => response)
    .catch((error: any) => {
      console.error(error);
      return new Error();
    });
};
