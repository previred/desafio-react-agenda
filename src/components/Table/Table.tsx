import { Table as TableAnt, TableProps } from "antd";
import { FunctionComponent } from "react";

const Table: FunctionComponent<TableProps> = ({ columns, dataSource }) => {
  return <TableAnt columns={columns} dataSource={dataSource} />;
};

export default Table;
