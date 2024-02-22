import { useState, useEffect } from 'react';
import { Spin, Space, Typography } from 'antd';

const { Title, Paragraph } = Typography;

import Drawer from '../components/drawer/drawer';
import Table from '../components/table/table';


const Home: React.FC = () => {
  const [reloadFlag, setReloadFlag] = useState(false);

  // Estado para controlar la animación de carga
  const [spinning, setSpinning] = useState<boolean>(false);
  // Estado para controlar la visibilidad de la página principal
  const [isVisibleHome, setIsVisibleHome] = useState<boolean>(false);

  /**
   * Efecto secundario que simula la carga de datos y muestra la página principal.
   */
    
  useEffect(() => {
    
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      setIsVisibleHome(true);
    }, 800);
  
  }, [])
  
  /**
   * Función para recargar la tabla de contactos.
   * Cambia el estado para forzar la recarga de la tabla.
   */
  const reloadTable = () => {
    // Cambia el estado para forzar la recarga de la tabla
    setReloadFlag(prevFlag => !prevFlag);

  };

  return (
    <div>
      {/* Spinner de carga */}
      <Spin spinning={spinning} fullscreen />
      {/* Contenido de la página principal */}
      {isVisibleHome && (
        <Space direction="vertical" size="middle">
          <div>
            {/* Título de la página */}
            <Title level={2}>Agenda Previred - Mi agenda de contactos laboral</Title>
            {/* Descripción de la página */}
            <Paragraph>Aquí podrá encontrar o buscar a todos sus contactos agregados, agregar nuevos contactos y eliminar contactos no deseados.</Paragraph>
          </div>
          {/* Cajón para agregar nuevos contactos */}
          <Drawer/>  
          {/* Tabla de contactos */}
          <Table reloadData={reloadTable} reloadFlag={reloadFlag}/> 
        </Space>
        )}
    </div>
  );
}

export default Home;
