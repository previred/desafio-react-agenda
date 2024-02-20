import React from "react";
import { Input } from "../../components/Input";

import "./SearchInput.scss";
import { CloseOutlined } from "@ant-design/icons";
import { useUsers } from "../../hook/useUser";

export const SearchInput = () => {
  const { listUserFilter, loadUserList } = useUsers();

  //Escucha cada vez que cambia el valor del input y va filtrando sobre el arreglo de la lista de usuarios
  const handlerPress = (event: React.ChangeEvent<HTMLInputElement>) => {
    listUserFilter(event.currentTarget.value);
  };

  // este metodo se llama cuando se presiona el icono del input, limpia el filtro realizado
  const clearSearchInput = () => {
    loadUserList();
  };

  return (
    <Input
      placeholder="Buscar contactos..."
      className="search-input"
      onChange={handlerPress}
      suffix={<CloseOutlined onClick={clearSearchInput} />}
    />
  );
};
