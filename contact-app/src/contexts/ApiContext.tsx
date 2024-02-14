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
  totalContacts: number;
  currentPage: number;
  currentLimit: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setCurrentLimit: React.Dispatch<React.SetStateAction<number>>;
  getContacts: (searchText?: string, page?: number, pageSize?: number) => void;
  addContact: (contact: Contact) => Promise<void>;
  removeContact: (id: string) => Promise<void>;
  //contactsImageExists: boolean[];
}

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

const APIurl = 'http://localhost:9000/api/users'

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [totalContacts, setTotalContacts] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentLimit, setCurrentLimit] = useState<number>(6);

  //const [ contactsImageExists, setContactsImageExists ] = useState<boolean[]>([]);


  /************** GET CONTACT LIST  BY PAGINATION AND SEARCH BAR **************/

  const getContacts = async (searchText?: string, page?: number, pageSize?: number) => {
    try {

      // set url : si el usuario usa el input search paginara automáticamente, no se hace paginación ya que no se esta llamando a todo el contenido del json aunque de ser necesario se puede ajustar y concatenar junto a los otros parámetros, y el total no se toma del X-Total-Count, si no del length (jsonContactsData.length) que se va generando para que no de paginas basadas en el total. 

      let url: string;
      searchText ?
        (url = `${APIurl}?q=${encodeURIComponent(searchText)}`)
        : url = `${APIurl}?_page=${currentPage}&_limit=${currentLimit}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonContactsData = await response.json();
      setContacts(jsonContactsData);

      //Get Total of users: para la paginación se necesita el total de registros, 'X-Total-Count' devuelve un string con el total, por eso requiere un parseInt, y una validación de nulidad - [Depende del Server, se recomienda hacer pruebas antes]   

      const totalCount = parseInt(response.headers.get('X-Total-Count') ?? '0', 10);
      setTotalContacts(totalCount);

      //console.log("🍄 ~ totalCount:", totalCount);

      page && setCurrentPage(page);
      pageSize && setCurrentLimit(pageSize);

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

    } catch (error) {
      console.error('Error getting contacts: ', error);
    }
    /*
    console.log("🍄 ~ pageSize:", pageSize)
    console.log("🍄 ~ page:", page)*/

  }

  /************** ADD NEW CONTACT **************/

  const addContact = async (contactData: Partial<Contact>) => {
    try {
      const response = await fetch(APIurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)

      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      getContacts();
    } catch (error) {
      console.error('Error creating Contact:', error)
    }
  }
  const removeContact = async (id: string) => {
    try {
      const response = await fetch(`${APIurl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      getContacts();
    } catch (error) {
      console.error('Error removing contact:', error);
    }

  }

  const contextValue: ApiContextProps = {
    contacts,
    totalContacts,
    getContacts,
    addContact,
    removeContact,
    currentPage,
    currentLimit,
    setCurrentPage,
    setCurrentLimit,
    //contactsImageExists,
  };

  return <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>

};

export const useApi = (): ApiContextProps => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used on an ApiProvider')
  }
  return context;
};
