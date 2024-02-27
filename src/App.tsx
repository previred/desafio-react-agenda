// src/App.tsx
import React, {useState} from 'react';
import { UserProvider } from './contex/userContext';
import UserList from './ui/components/userList/userList';
import AddUserForm from './ui/components/createUser/createUser';
import Header from './ui/components/header/header';
import Btn from './ui/components/btn/btn'

const App = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => setIsFormVisible(!isFormVisible);
  return (
    <UserProvider>
      <div className="app">
        <Header />
        <Btn type="primary" value="Agregar Contactos" onClick={toggleFormVisibility}/>
        <UserList />
        <AddUserForm visible={isFormVisible} onClose={() => setIsFormVisible(false)} /> 
      </div>
    </UserProvider>
  );
};

export default App;
