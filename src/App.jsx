import { Input, Divider, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableComponent from "./components/Table/TableComponent";
const { Search } = Input;
import "./App.css";
import { useSidebar } from "./hooks/useSidebar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const { showSidebar } = useSidebar();
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <div className="container">
      <div>
        <h1>Agenda Previred - Mi agenda de contactos laboral</h1>
        <p>
          Aquí podrás encontrar o buscar todos tus contactos agragdos, agregar
          nuevos contactos y eliminar contactos no deseados
        </p>
      </div>
      <div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showSidebar()}
        >
          Agregar contacto
        </Button>
      </div>
      <div className="inputSearch">
        <Search placeholder="input search text" onSearch={onSearch} />
        <Divider className="divider" />
      </div>

      <div className="table">
        <TableComponent />
      </div>
      <Sidebar />
    </div>
  );
}

export default App;
