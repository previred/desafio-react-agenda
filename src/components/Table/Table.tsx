import { Table as TableAnt } from "antd";
import type { TableProps } from "antd";
import { FunctionComponent } from "react";
import { ButtonDelete } from "../Button/components";
import Typography from "../Typography/Typography";

type ColumnsType = {
  nombre: string;
  descripcion: string;
  acciones: string;
};

const Table: FunctionComponent = () => {
  const columns: TableProps<ColumnsType>["columns"] = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      render: (text) => <Typography type="text" label={text} />,
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      key: "descripcion",
      render: (text) => <Typography type="text" label={text} />,
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
      render: (id) => <ButtonDelete id={id} />,
    },
  ];

  const data: ColumnsType[] = [
    {
      nombre: "pablo",
      descripcion: "descripcion",
      acciones: "1",
    },
  ];

  return <TableAnt columns={columns} dataSource={data} />;
};

export default Table;
