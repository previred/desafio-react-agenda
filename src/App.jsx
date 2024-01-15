import { Input, Divider, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableComponent from "./components/Table/TableComponent";
const { Search } = Input;
import "./App.css";
import { useSidebar } from "./hooks/useSidebar";
import Sidebar from "./components/Sidebar/Sidebar";
import { createUser, deleteUserById, getUsers } from "./services/userServices";
import { useEffect } from "react";
import { useState } from "react";
import { transformData } from "./utils/transformData";
import { useCallback } from "react";

function App() {
  const { showSidebar, hideSidebar } = useSidebar();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Obtener los usuarios de la página actual.
      const paginatedResponse = await getUsers({
        page: currentPage,
        limit: pageSize,
      });
      setTotal(paginatedResponse.total); // devuelve el total.
      setData(transformData(paginatedResponse.data)); // Transforma los datos para la tabla.
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const onSearch = async (value) => {
    try {
      const result = await getUsers({ query: value });
      setData(transformData(result.data)); // Transforma los datos para la tabla.
      setTotal(result.length); // devuelve el total.
      setCurrentPage(1); // inicializa la página actual en 1
    } catch (error) {
      console.error("Error al buscar", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUserById(id);
      if (currentPage > 1 && data.length === 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      fetchData();
    }
  };

  const onFinish = async (values) => {
    try {
      await createUser(values);
      hideSidebar(); // Cierra el sidebar después de guardar el contacto
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    } finally {
      fetchData();
    }
  };
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
        {data && (
          <TableComponent
            dataSource={data}
            current={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={handleTableChange}
            loading={loading}
            onDelete={handleDelete}
          />
        )}
      </div>
      <Sidebar onFinish={onFinish} />
    </div>
  );
}

export default App;
