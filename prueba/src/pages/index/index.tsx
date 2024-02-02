import React, { useEffect, useState } from 'react';
import List from './components_page/list';
import { Button, Card, Typography } from 'antd';
import OnSearch from './components_page/search';
import Create from './components_page/create';
import { PlusOutlined } from '@ant-design/icons';
import useGet from '../../_hooks/useGet';
import useDelete from '../../_hooks/useDelete';
import useCreate from '../../_hooks/useCreate';


interface PayloadType {
  photo: string;
  name: string;
  description: string;
}
/**
 * Renders the Index component, displaying a heading and a List component.
 *
 * @return {JSX.Element} The JSX for the Index component
 */
const Index = () => {
  const { Title }                 = Typography;
  const [open, setOpen]           = useState(false);
  
  /** Hooks used in this component */
  const {users, getUsers, search} = useGet();
  const {deleteUser}              = useDelete();
  const {create}                  = useCreate();


  /** Functions used in this component */
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    await getUsers();
  }

  const handlerCreate = async (data: PayloadType) => {
    await create(data);
    await  getUsers();
  }

  const handlerSearch = async (value: string) => {
    await search(value);
  }

  useEffect(() => {
    getUsers();
  },[]);


  return (
    <div  style={{ margin: "100px 100px" }}>
      <div style={{ marginBottom: "40px" }}>
        <Title level={2}>Agenda Previred - Mi agenda de contactos laboral</Title>
        <Title level={5}>Aqui podrá encontrar  o buscar a todos sus contactos agregados, agregar nuevos contactos y eliminar contactos no deseados.</Title>
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
          Agregar contacto
        </Button>
      </div>
      <OnSearch
        onSearch={handlerSearch}
      />
      <Card
        type="inner"
        title="Listado de usuarios"
      >
        <List
          dataSource={users}
          handlerDelete={handleDelete}
        />
      </Card>
      <Create onCreate={handlerCreate}  onClose={onClose} open={open} />
    </div>
  );
}

export default Index;