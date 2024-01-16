import React from "react";
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import './header.css';
import { useDrawer } from "../../context/DrawerContext";
import { useApiUsers } from "../../context/UserContext";

/*
    Este es nuestro header el cual contiene: 
        Los primeros 2 textos iniciales
        El botón para agregar un nuevo contacto
        El buscador por nombre

    Decidi que fuera nuestro header ya que más adelante tendremos la tabla como un componente.

    Aqui podemos apreciar que utilizamos 2 contextos generales
    useDrawer -> Utilizado para abrir y cerrar el Drawer (Formulario de nuevo contacto)
                    En este caso solo usamos el showDrawer (para abrir el Drawer)
    useApiUsers -> Utilizado para obtener alguna información del api usuarios
                    En este caso searchUser así podremos buscar un nombre de usuario.
                    (Al buscar el nombre el search le pasa el parametro al searchUser y este al API)

    Se realizo la estructura con Row y Col para que este respete las reglas de las grid.
    Además asi podemos realizar un ajuste a pantallas (en este caso es solo para pc).

    Tenemos nuestra propia hoja de estilo para asi dar mejora de forma independiente al header.
*/

const { Search } = Input;
const Header: React.FC = () => {
    const { showDrawer } = useDrawer();
    const { searchUser } = useApiUsers();
    const onSearch: SearchProps['onSearch'] = (value) => searchUser(value);

    return(
        <Row>
            <Col span={24}>
                <span className="title">Agenda Previred - Mi agenda de contactos laboral</span>
            </Col>
            <Col span={24}>
                <span className="subTitle">Aquí podrá encontrar o buscar a todos sus contactos agregados, agregar nuevos contactos y eliminar contactos no deseados.</span>
            </Col>
            <Col span={24}>
                <Button type="primary" className="btnAddContact" icon={<PlusOutlined height={3} />} onClick={showDrawer}>
                    Agregar Contacto
                </Button>    
            </Col>
            <Col span={24}>
                <Search placeholder="Ingrese el nombre del contacto que desea buscar" onSearch={onSearch}/>  
                <div className="divition"></div>     
            </Col>
        </Row>
    )
}

export default Header;