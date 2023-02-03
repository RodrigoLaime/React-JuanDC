import React from "react";

import { TodoContext } from "../TodoContext";
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';

function AppUI() {

  //guardarmos el "value" de provaider en una constante
  const {
    loading,
    error,
    searchedTodos,
    completeTodo,
    deleteTodo,
  } = React.useContext(TodoContext)

  return (

    <React.Fragment>
      <TodoCounter />
      <TodoSearch />
      <TodoContext.Consumer>

        <TodoList>
          {error && <p>Error</p>}
          {loading && <p>Cargando</p>}
          {(!loading && !searchedTodos.length) && <p>Crear todo</p>}
          {searchedTodos.map(todo => (
            <TodoItem
              key={todo.text}
              text={todo.text}
              completed={todo.completed}
              onComplete={() => completeTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
            />
          ))}
        </TodoList>

      </TodoContext.Consumer>

      <CreateTodoButton />
    </React.Fragment>

  );
}

export { AppUI }