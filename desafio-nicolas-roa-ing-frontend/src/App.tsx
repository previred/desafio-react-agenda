import './App.css';
import Main from './layout/main';
import { UserProvider } from './context/UserContext';
import { DrawerProvider } from './context/DrawerContext';

/* 

  Aqui realizamos el llamado a los Provider según su jerarquia
  UserProvider es primero por ser quien interactua con la tabla, nuevo usuario, buscador y 
  eliminador de usuario.
  DrawerProvider es segundo por que su utilización es abrir o cerrar el formulario del nuevo usuario
  estos deben encerrar a nuestro Main ya que estos son el APPCONTEXT
*/

function App() {
  return (
    <div className="App">
      <UserProvider>
        <DrawerProvider>
          <Main />
        </DrawerProvider>
      </UserProvider>
    </div>
  );
}

export default App;
