import React, { useEffect, useState, ReactNode, useContext } from "react";
import { IUser, UserContextType } from "../@types/users";
import axios from "axios";

/*

  Aqui estamos en el context más importante y el encaragdo de conectarnos con nuestra API

  contamos con nuestro contexto ya creado.

  en el provider tenemos nuestro estado 
  users -> listado de usuarios
  isLoading -> estado de carga waiting...
  error -> retorna algún error de conexion con el API

  Todas las consultas estan siendo ejecutadas con AXIOS

  getUsers -> obtenemos el listado de usuarios, si existe un error retornamos el error y un false

  searchUserApi -> buscamos mediante el nombre del usuario -> este campo se le pasa mediante un parametro
  si el usuario preciona el boton sin nada en la buqueda vuelve a cargar el listado de usuarios.

  lastId gracias a reducer podemos saber el ultimo ID del listado de usuarios actualizado,
  así al momento de guardar un  usuario nuevo se invocara esta funcion y se le sumara 1
  Así evitamos problemas de sincronia con react y sus KEYS en al tabla de ant desing

  postUser -> guardamos nuestro usuario

  deleteUserApi -> se elimina el usuario

  Antes de pasar a las funciones mencionadas anteriormente...
  
  estas pasan a las funcionens expuestas del contexto

  saveUser -> obtiene, ordena la data y se la pasa a postUser
              -> luego si la inserción es exitosa realiza una actualización del estado del listado 
                  de usuarios (users) -> para no volver a llamar a la función getUsers 
                  (así se ahorran recursos de peticion)
                  FAVOR LEER EL COMENTARIO DENTRO DE LA FUNCIÓN saveUser

  searchUser -> obtiene y envia a el nombre a searchUserApi (este si debe re renderizar la data)

  deleteUser -> obtiene el id del usuario a eliminar y le pasa tál numero al deleteUserApi
              -> luego si la eliminación es exitosa, realiza una actualización del estado del listado 
                  de usuarios (users) -> para no volver a llamar a la función getUsers 
                  (así se ahorran recursos de peticion)
                  FAVOR LEER EL COMENTARIO DENTRO DE LA FUNCIÓN deleteUser


  luego realizamos nuestra configuración de retorno con el provider 
  y ya esta listo para ser utilizado este context
*/

export const UserContext = React.createContext<UserContextType | null>(null);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {

  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/users');
      setUsers(response.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchUserApi = async (name: string) => {
    try {
      const response = await axios.get(`http://localhost:9000/api/users?q=${name}`);
      setUsers(response.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };


  const lastId = () => users.reduce((maxId, item) => item.id && item.id > maxId ? item.id : maxId, 0);

  const postUser = async (user: IUser) => {
    try {
      const response = await axios.post('http://localhost:9000/api/users', user);
      return response.data;
    } catch (error: any) {
      console.error('Error en la solicitud:', error.message);
      return false;
    }
  };

  const deleteUserApi = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:9000/api/users/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Error en la solicitud:', error.message);
      return false;
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const saveUser = async (user: IUser) => {
    user.id = lastId() + 1;
    const newUser: IUser = {
      id: user.id,
      name: user.name,
      description: user.description,
      photo: user.photo,
    };
    const newUserPost = await postUser(newUser);
    if(newUserPost){
      /*
        Así no se llama a la api nuevamente, 
        se llamara al api para obtener los datos solo cuando se actualice la pantalla, 
        se esta manejando por contexto los datos de la tabla 
      */
      setUsers([...users, newUser]);
    }
  };

  const searchUser = async(name: string) => {
    // const filteredSearchUser = users.filter((user: IUser) => user.name.toUpperCase() === name.toUpperCase());
    // setUsers(filteredSearchUser);
    searchUserApi(name);
  }

  const deleteUser = async (id: number) => {
    const deleteUser = await deleteUserApi(id);
    if(deleteUser){
      /*
        Así no se llama a la api nuevamente, 
        se llamara al api para obtener los datos solo cuando se actualice la pantalla, 
        se esta manejando por contexto los datos de la tabla 
      */
      const filteredUsers = users.filter((user: IUser) => user.id !== id);
      setUsers(filteredUsers);
    }
  };

  return (
    <UserContext.Provider value={{ users, saveUser, searchUser, deleteUser, isLoading, error }}>
        {children}
    </UserContext.Provider>
    )
}

export const useApiUsers = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useApi must be used within an ApiProvider');
    }
    return context;
};