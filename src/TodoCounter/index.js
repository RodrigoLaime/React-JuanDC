import React from "react";
import './TodoCounter.css';

function TodoCounter({ total, completed }) {

  return (
    <h2 className="TodoCounter">completaste {completed} de {total} todos</h2>
  );
}

export { TodoCounter }; 