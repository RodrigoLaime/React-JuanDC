import React from 'react';
import { AppUI } from './AppUI';

/* const defaultTodos = [
  { text: 'Cortar cebolla', completed: true },
  { text: 'Tomar el cursso de intro a React', completed: false },
  { text: 'Llorar con la llorona', completed: true },
  { text: 'LALALALAA', completed: false },]; */


function App() {
  const localStorageTodos = localStorage.getItem('TODOS_V1')
  //nuestro estado por defecto
  let parsedTodos;

  //si no hay nada creado
  if (!localStorageTodos) {
    //crear por defecto una lista bacia transformando a string
    localStorage.setItem('TODOS_V1', JSON.stringify([]));
    parsedTodos = [];
  } else { //si ya hay algocreado
    //obtenemos los datos transformando el string a object
    parsedTodos = JSON.parse(localStorageTodos)
  }

  const [todos, setTodos] = React.useState(parsedTodos);
  const [searchValue, setSearchValue] = React.useState('');

  //para ver cuantos toso tenemos en el array
  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  //filtrar la cantidad de todos dependiendo del valor de searchVaalues
  let searchedTodos = [];
  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      //convertir a minuscula la db
      const todoText = todo.text.toLowerCase();
      //convertir a minuscula el value del input
      const searchText = searchValue.toLowerCase();
      //si incluye lo que escribamos en el input
      return todoText.includes(searchText);
    });
  }

  //guardar las actualizaciones completes y eliminar con persistencia en localstorage 
  const saveTodos = (newTodos) => {
    //convertimos a string todos nuestros todos
    const stringifiedTodos = JSON.stringify(newTodos)
    //persistencia
    localStorage.setItem('TODOS_V1', stringifiedTodos)
    //evitar recargar la pagina, permite quedar con la ultima version
    setTodos(newTodos)
  }

  //funcion para editar todos
  const completeTodo = (text) => {
    //buscar el index si todotext es igual al textinput
    const todoIndex = todos.findIndex(todo => todo.text === text);
    //creamos una copioa de todos
    const newTodos = [...todos]
    //encontrar la posicion index dentro de la lista de todos y que de ese objeto que nos esta llamando completed es igual a true
    newTodos[todoIndex].completed = true;
    //actualizar estado
    saveTodos(newTodos);
  }

  //funcion para Eliminar todos
  const deleteTodo = (text) => {
    //buscar el index si todotext es igual al textinput
    const todoIndex = todos.findIndex(todo => todo.text === text);
    //creamos una copioa de todos
    const newTodos = [...todos]
    //en que posicion cortar y cuantas tajadas coratar
    newTodos.splice(todoIndex, 1)
    //actualizar estado
    saveTodos(newTodos);
  }

  return (
    <AppUI
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;