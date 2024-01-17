import { Typography } from 'antd';
const { Title } = Typography;

const Header = () => {
  return (
    <div className='container'>
        <Title level={2}>
          Agenda Previred - Mi agenda de contactos laboral
        </Title>
        <p className='headerText'>
          Aqui podra encontrar o buscar a todos sus contactos agregados, agregar nuevos contactos y eliminar contactos no deseados
        </p>
      </div>
  )
}
export default Header
