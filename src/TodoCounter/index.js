import React from "react";
import { TodoContext } from "../TodoContext";
import './TodoCounter.css';

function TodoCounter() {
  //enves de props usamos todoContext
  const { totalTodos, completedTodos } = React.useContext(TodoContext)
  return (
    <h2 className="TodoCounter">completaste {completedTodos} de {totalTodos} todos</h2>
  );
}

export { TodoCounter }; 