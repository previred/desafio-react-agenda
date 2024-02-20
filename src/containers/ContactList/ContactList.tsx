import Table from "../../components/Table/Table";
import { Typography } from "../../components/Typography";
import { ButtonAdd } from "../ButtonAdd";
import { SearchInput } from "../SearchInput";

import "./ContactList.scss";

export const ContactList = () => {
  return (
    <div className="contact-list">
      <Typography
        label="Agenda Previred - Mi agenda de contacto laboral"
        type="title"
      />
      <Typography
        type="text"
        label="Aquí podrá encontrar o buscar a todos sus contactos agregados, agregar nuevos contactos y eliminar contactos no deseados"
        className="contact-list__subtitle"
      />
      <ButtonAdd />
      <SearchInput />
      <Table />
    </div>
  );
};
