import { TodoType } from "../types/TodoType";

interface PropsTodo {
  todo: TodoType;
  handleRemoveTodo: (id: number) => void;
  handleCheckTodo: (id: number) => void;
}

const Todo = ({ todo, handleRemoveTodo, handleCheckTodo }: PropsTodo) => {
  return (
    <>
      <td>
        <input type="checkbox" checked={todo.complete} onChange={() => handleCheckTodo(todo.id)} />
      </td>
      <td>
        <span className={todo.complete ? "done" : "earring"}></span>
      </td>
      <td>{todo.title}</td>
      <td>
        <button className="btn btn-outline-danger mx-1" onClick={() => handleRemoveTodo(todo.id)}>
          <i className="bi bi-trash" />
        </button>
      </td>
    </>
  );
};

export default Todo;
