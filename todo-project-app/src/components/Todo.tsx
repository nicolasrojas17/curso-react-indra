import { TodoType } from "../types/TodoType";

interface PropsTodo {
  todo: TodoType;
  handleRemoveTodo: (id: number) => void;
  handleCheckTodo: (id: number, checked: boolean) => void;
}

const Todo = ({ todo, handleRemoveTodo, handleCheckTodo }: PropsTodo) => {

  return (
    <>
      <td>
        <input type="checkbox" checked={todo.complete || false} onChange={(event) => handleCheckTodo(todo.id, event.target.checked)} />
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
