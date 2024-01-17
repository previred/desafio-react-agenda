import { Layout, Typography, Divider } from 'antd';
import { useState, useEffect } from 'react';
import UserList from '../components/UserList';
import UserAdd from '../components/UserAdd';
import UserSearch from '../components/UserSearch';
import useApiGetAllUsers from '../hooks/useApiGetAllUsers';
import { User } from '../users/domain/User';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const Home = () => {

  const [dataApi, setDataApi] = useState<User[]>([]);
  const [loading] = useApiGetAllUsers(setDataApi);
  
  useEffect(()=>{
    setDataApi(dataApi);
  }, [dataApi]);

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
                <UserList users={dataApi} />
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