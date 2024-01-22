import React, { useContext } from "react";
import { ContactContext } from "../context/ContactContext.tsx";
import Search from "antd/es/input/Search";

export const SearchContact = (): JSX.Element => {
  const context = useContext(ContactContext);

  if (!context) {
    throw new Error('Context Error');
  }

  const { searchContacts } = context

  const onSearch = async (value) => {
    await searchContacts(value)
  }

  return (
    <Search placeholder="Busqueda de contactos" onSearch={onSearch} />
  )
}