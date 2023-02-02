import React from "react";
import './CreateTodoButton.css'
function CreateTodoButton(props) {
  const onclickButton = (msg) => {
    alert(msg)
  }

  return (
    <button
      className="CreateTodoButton"
      onClick={() => onclickButton('Modal')}
    >
      +
    </button>
  );
}

export { CreateTodoButton }