import React from 'react';
import './App.css';

function App() {

  const names = ["Octavio", "Gilberto", "Álvaro"];
  // Al JSX se le pueden inyectar variables (strings, numeros, etc)
  // con el uso de { myVar }
  const namesJsx = names.map((name, i) => {
    return <p key={i}>Hello {name}</p>;
  });
  // Como resultado tenemos 3 párrafos con "Hello Octavio", "Hello Gilberto" y "Hello Álvaro"
  // Key solo es una propiedad que pide React cuando se van a crear listas de JSX, no tiene mucha importancia para nosotros

  return (
    <div className="App">
      {/* Nuestra nueva expresión namesJSX se puede mostrar en el navegador */}
      {namesJsx}
      {/**
       * Equivalente a
       * <p> Hello Octavio </p>
       * <p> Hello Gilberto </p>
       * <p> Hello Álvaro </p>
       */}
    </div>
  );
}

export default App;
