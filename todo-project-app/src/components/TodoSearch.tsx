interface PropsTodoSearch {
  searchValue: string;
  setSearchValue: (todo: string) => void;
}

export const TodoSearch = ({ searchValue, setSearchValue }: PropsTodoSearch) => {
  const onInputChange = ({ target }: any) => {
    const { value } = target;
    setSearchValue(value);
  };

  return (
    <div className="container-search">
      <div className="search">
        <input
          type="text"
          className="input-search-todo"
          placeholder="Buscar..."
          name="search"
          value={searchValue}
          onChange={onInputChange}
        />
        <span>
          <i className="bi bi-search h5"></i>
        </span>
      </div>
    </div>
  );
};
