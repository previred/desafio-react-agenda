import React from "react";
import { Layout } from 'antd';
import { Content } from "antd/es/layout/layout";
import TableData from "../components/tableData/tableData";
import './main.css';
import Header from "./header/header";
import NewContact from "../components/contact/newContact"

/*
    Este es el Layout de la aplicación 
    decidí crearlo por que así podemos manipular, 
    el contorno sin afectara a los componentes.
    
    Además es una buena practica mantener una estructura inicial
    ya que hace el codigo más facil de leer.

    Además podemos dar una hoja de estilo propia al Layout

*/

const Main: React.FC = () => {
    return(
        <Layout className="main">
            <Content className="content">
                <Header />
                <TableData />
                <NewContact />       
            </Content>
        </Layout>
    )
}

export default Main;