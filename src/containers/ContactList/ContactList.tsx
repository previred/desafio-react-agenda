import Table from "../../components/Table/Table";
import { Typography } from "../../components/Typography";
import { ButtonAdd } from "../ButtonAdd";

export const ContactList = () => {
  return (
    <>
      <Typography
        label="Agenda Previred - Mi agenda de contacto laboral"
        type="title"
      />
      <Typography
        type="text"
        label="Aquí podrá encontrar o buscar a todos sus contactos agregados, agregar nuevos contactos y eliminar contactos no deseados"
      />
      <ButtonAdd />
      <Table />
    </>
  );
};
