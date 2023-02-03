import React from 'react';
import { AppUI } from './AppUI';

/* const defaultTodos = [
  { text: 'Cortar cebolla', completed: true },
  { text: 'Tomar el cursso de intro a React', completed: false },
  { text: 'Llorar con la llorona', completed: true },
  { text: 'LALALALAA', completed: false },]; */


function useLocalStorage(itemName, initialValue) {

  const localStorageItem = localStorage.getItem('TODOS_V1')
  //nuestro estado por defecto
  let parsedItem;

  //si no hay nada creado
  if (!localStorageItem) {
    //crear por defecto una lista bacia transformando a string
    localStorage.setItem('TODOS_V1', JSON.stringify(initialValue));//cambiar el array por initialValue=[]
    parsedItem = initialValue;
  } else { //si ya hay algocreado
    //obtenemos los datos transformando el string a object
    parsedItem = JSON.parse(localStorageItem)
  }

  const [item, setItem] = React.useState(parsedItem);

  //guardar las actualizaciones completes y eliminar con persistencia en localstorage 
  const saveItem = (newItem) => {
    //convertimos a string Item nuestros Item
    const stringifiedItem = JSON.stringify(newItem)
    //persistencia
    localStorage.setItem(itemName, stringifiedItem)
    //evitar recargar la pagina, permite quedar con la ultima version
    setItem(newItem)
  }

  //actualizar los elementos
  return [
    item,
    saveItem,
  ];
}

function App() {

  const [todos, saveTodos] = useLocalStorage('TODOS_V1', [])//se puede cambiar a v2

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