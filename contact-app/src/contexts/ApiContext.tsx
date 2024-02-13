import { error } from "console";
import { createContext, useContext, useState, ReactNode } from "react"

interface Contact {
  key: string;
  id: string;
  name: string;
  description: string;
  photo: string;
  action: string;
}

interface ApiContextProps {
  contacts: Contact[];
  getContacts: () => void;
  addContact: (contact: Contact) => Promise<void>;
  //contactsImageExists: boolean[];
}

const ApiContext = createContext<ApiContextProps | undefined >(undefined);

const APIurl = 'http://localhost:9000/api/users'

export const ApiProvider: React.FC<{ children : ReactNode }> = ({children}) => {
  const [ contacts, setContacts ] = useState<Contact[]>([]);
  //const [ contactsImageExists, setContactsImageExists ] = useState<boolean[]>([]);

  const getContacts = async () => {
    try{
      const response = await fetch( APIurl ,{
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
        }
      });

      if( !response.ok ){
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonContactsData = await response.json();
      setContacts(jsonContactsData);

      // Verificar la existencia de las imágenes aquí y actualizar el estado
      /*const imageExistence = await Promise.all(
        jsonContactsData.map(async (user: Contact) => {
          try {
            await fetch(user.photo, { method: 'HEAD' });
            return true;
          } catch (error) {
            return false;
          }
        })
      );

      setContactsImageExists(imageExistence);*/

    } catch (error){
      console.error('Error getting contacts: ', error);
    }
  }

  const addContact = async ( contactData:Partial<Contact> ) => {
    try{
      const response = await fetch( APIurl, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)

      });
      if( !response.ok ){
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      getContacts();
    } catch ( error ){
      console.error('Error creating Contact:', error)
    }
  }

  const contextValue: ApiContextProps = {
    contacts,
    getContacts,
    addContact
    //contactsImageExists,
  };

  return <ApiContext.Provider value={contextValue}>{ children }</ApiContext.Provider>

};

export const useApi = (): ApiContextProps => {
  const context = useContext(ApiContext);
  if(!context){
    throw new Error('useApi must be used on an ApiProvider')
  }
  return context;
};
