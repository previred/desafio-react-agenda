import { Layout, Typography, Divider } from 'antd';
import { useEffect } from 'react';
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
  
  useEffect(() => {
    if (estado) {
      fetchData(); // Vuelve a ejecutar la carga cuando estado es true
      updateEstado(false);
    }
  }, [estado, fetchData, updateEstado]);

  if(loading){
    return <>Cargando</>
  }

  return (
    <>
      <Layout style={{ background: '#fff' }}>
        <Content style={{ padding: '40px 60px' }}>
          <Title>Agenda Previred - Mi agenda de contactos laboral</Title>
          <Paragraph>Aquí podrá encontrar o buscar a todos sus contactos agregados, agregar nuevos contactos y eliminar contactos no deseados.</Paragraph>
          <UserAdd />
          <UserSearch />
          <Divider style={{ margin: "24px 0" }} />
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