import React, { createContext, useState } from "react";
import axios from "axios";

type Contacts = {
  id: number;
  name: string;
  description: string;
  photo: string;
}

interface ThemeContextType {
  isLoading: boolean;
  contactsData: Array<Contacts>;
  getAllContacts: () => void;
  getContactsPerPage: (page) => void;
  searchContacts: (text) => void;
  createContact: (contact) => void;
  deleteContact: (id) => void;
  drawerVisible: boolean;
  showDrawer: () => void; 
  closeDrawer: () => void;
  totalData: number;
  currentPage: number;
  setCurrentPageFunction: (page) => void;
}

export const ContactContext = createContext<ThemeContextType | undefined>(undefined);

export const ContactProvider = ({ children }) => {
  const [contactsData, setContactsData] = useState<Array<Contacts>>([])
  const [isLoading, setIsLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const BASE_URL = 'http://localhost:9000'

  // Drawer Functions
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  // Pagination
  const setCurrentPageFunction = (page) => {
    setCurrentPage(page)
  }

  // API requests
  const getAllContacts = async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.get(`${BASE_URL}/api/users`);

      setTotalData(data.length);
      setContactsData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);

      setIsLoading(false);
    }
  };

  const getContactsPerPage = async (page) => {
    try {
      setIsLoading(true);

      const { data } = await axios.get(`${BASE_URL}/api/users?_page=${page}&_limit=5`);

      setContactsData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);

      setIsLoading(false);
    }
  };

  const searchContacts = async (text) => {
    try {
      setIsLoading(true);

      const { data } = await axios.get(`${BASE_URL}/api/users?q=${text}`);

      setTotalData(data.length);
      setContactsData(data);
      setCurrentPage(1);
      setIsLoading(false);
    } catch (error) {
      console.log(error);

      setIsLoading(false);
    }
  }; 

  const createContact = async (contact) => {
    try {
      setIsLoading(true);

      await axios.post(`${BASE_URL}/api/users`, contact);

      setIsLoading(false);
    } catch (error) {
      console.log(error);

      setIsLoading(false);
    }
  };

  const deleteContact = async (id) => {
    try {
      setIsLoading(true);

      await axios.delete(`${BASE_URL}/api/users/${id}`);

      setIsLoading(false);
    } catch (error) {
      console.log(error);

      setIsLoading(false);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        isLoading,
        contactsData,
        getAllContacts,
        getContactsPerPage,
        searchContacts,
        createContact,
        deleteContact,
        drawerVisible,
        showDrawer,
        closeDrawer,
        totalData,
        currentPage,
        setCurrentPageFunction
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}