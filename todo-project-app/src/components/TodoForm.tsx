import { TodoType } from "../types/TodoType";

interface PropsTodoForm {
  handleAddTodo: () => void;
  setTodoForm: (todo: TodoType) => void;
  todoForm: TodoType;
}

export const TodoForm = ({ handleAddTodo, setTodoForm, todoForm }: PropsTodoForm) => {
  const { title } = todoForm;

  const onInputChange = ({ target }: any) => {
    const { name, value } = target;
    setTodoForm({ ...todoForm, [name]: value });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    handleAddTodo();
  };

  return (
    <form className="save-todo" onSubmit={onSubmit}>
      <input
        type="text"
        className="input-save-todo"
        placeholder="Agrega una nueva tarea"
        name="title"
        value={title}
        onChange={onInputChange}
      />
      <button className="btn-save-todo" type="submit">
        Save
      </button>
    </form>
  );
};
