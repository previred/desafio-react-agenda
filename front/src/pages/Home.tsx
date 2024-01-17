import { Layout, Typography, Divider } from 'antd';
import { useEffect, useState } from 'react';
import UserList from '../components/UserList';
import UserAdd from '../components/UserAdd';
import UserSearch from '../components/UserSearch';
import useApiGetAllUsers from '../hooks/useApiGetAllUsers';
import { UpdateUserList } from '../context/UpdateUserListContext';
import { useContext } from 'react';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const Home = () => {

  const [loading, data, fetchData] = useApiGetAllUsers();
  const { estado, updateEstado } = useContext(UpdateUserList)!;
  const [query, setQuery] = useState<string>("");
  
  useEffect(() => {
    if (estado) {
      fetchData(query); // Vuelve a ejecutar la carga cuando estado es true
      updateEstado(false);
    }
  }, [estado, fetchData, updateEstado, query]);

  const handleSearch = (searchValue: string) => {
    // Seteo para ejecutar la busqueda
    setQuery(searchValue);
    updateEstado(true);
  };

  return (
    <>
      <Layout style={{ background: '#fff' }}>
        <Content style={{ padding: '40px 60px' }}>
          <Title>Agenda Previred - Mi agenda de contactos laboral</Title>
          <Paragraph>Aquí podrá encontrar o buscar a todos sus contactos agregados, agregar nuevos contactos y eliminar contactos no deseados.</Paragraph>
          <UserAdd />
          <UserSearch onSearch={handleSearch} />
          <Divider style={{ margin: "24px 0" }} />
          {loading && <div>Cargando...</div>}
          <UserList users={data} />
            {/* Agregar contacto */}
            {/* Busqueda */}
            {/* Tabla */}
            {/* drawer */}
        </Content>
      </Layout>
    </>
  )
}

export default Home