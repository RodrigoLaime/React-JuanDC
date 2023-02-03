import React from "react";

function useLocalStorage(itemName, initialValue) {
  // estado de erro
  const [error, setError] = React.useState(false);
  // estado de loading
  const [loading, setLoading] = React.useState(true);
  // estado de todos
  const [item, setItem] = React.useState(initialValue);

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName)
        //nuestro estado por defecto
        let parsedItem;

        //si no hay nada creado
        if (!localStorageItem) {
          //crear por defecto una lista bacia transformando a string
          localStorage.setItem(itemName, JSON.stringify(initialValue));//cambiar el array por initialValue=[]
          parsedItem = initialValue;
        } else { //si ya hay algocreado
          //obtenemos los datos transformando el string a object
          parsedItem = JSON.parse(localStorageItem)
        }

        //actualize el valor del estado
        setItem(parsedItem)

        //quitar el loading
        setLoading(false)

      } catch (error) {
        setError(error)
      }
    }, 1000);
  });


  //Eliminar o guardar las actualizaciones completas con persistencia en localstorage 
  //no se ejecuta por defecto solo permite actualizarlo, no espera a que la app cargue  
  const saveItem = (newItem) => {
    try {
      //convertimos a string Item nuestros Item
      const stringifiedItem = JSON.stringify(newItem)
      //persistencia
      localStorage.setItem(itemName, stringifiedItem)
      //evitar recargar la pagina, permite quedar con la ultima version
      setItem(newItem)
    } catch (error) {
      setError(error)
    }
  }

  //actualizar los elementos
  return { //si tenemos mas estados en un mismo cutomReactHook no se envia [...] sino un {...}
    item,
    saveItem,
    loading,
    error
  };
}//final funcio localstorague


export { useLocalStorage }