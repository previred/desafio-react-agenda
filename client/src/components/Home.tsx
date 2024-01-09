import React, { useState, useEffect, useContext } from 'react';
import { Modal, Form as FormA, Input, Space, notification } from 'antd';
import { Button, InputGroup, Form } from 'react-bootstrap';
import ContactsTable from './ContactsTable';
import { contactsContext } from '../context/contactsContext';
import { getData, createData, removeData } from '../api/index';
import { IContact } from '../models/contacts';

const Home = () => {
  const { loadingData, initContacts, addContact, removeContact } = useContext(contactsContext)
  const [selectedUser, setSelectedUser] = useState<IContact | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [form] = FormA.useForm();

  useEffect(() => {
    getData('/api/users')
      .then(res => res.json())
      .then(res => {
        console.log('res', res)
        initContacts(res)
      })
  }, [])

  const showModal = (type: string) => {
    if (type === 'create') {
      setIsCreateModalOpen(true);
      form.resetFields()
    } else {
      setIsDeleteModalOpen(true)
    }
  };

  const handleOk = (type: string) => {
    if (type === 'create') {
      setIsCreateModalOpen(false);
    } else if (selectedUser) {
      removeData('/api/users/' + selectedUser.id)
        .then(res => res.json())
        .then(res => {
          removeContact(selectedUser.id)
          openNotification('success', 'USUARIO ELIMINADO', 'El proceso fue exitoso')
          setIsDeleteModalOpen(false)
        })
      
    }
  };

  const handleCancel = (type: string) => {
    if (type === 'create') {
      setIsCreateModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const onFinish = (contact: IContact) => {
    createData('/api/users', contact)
      .then(res => res.json())
      .then((res: IContact) => {
        const dataToSend = {...contact}
        dataToSend.id = res.id
        addContact(dataToSend)
        openNotification('success', 'USUARIO CREADO', 'El proceso fue exitoso')
        handleOk('create')
      })
  };

  const deleteContact = (contact: IContact) => {
    setSelectedUser(contact)
    showModal('delete')
  }

  const openNotification = (type: string, message: string, description: string) => {
    api[type]({
      message,
      description,
      duration: 3
    });
  };

  return (
    <div className="Contacts">
      {contextHolder}
      <main>
        {
          !loadingData 
            ? (
              <div>
                { /* Basic Info */ }
                <h1>Agenda previred - Mi agenda de contactos laboral</h1>
                <p className="mb-4">
                  Aquí podrá encontrar o buscar a todos sus contactos agregados,
                  agregar nuevos contactos y eliminar contactos no deseados
                </p>
                <Button onClick={() => showModal('create')} className="mb-3" variant="primary">Agregar Contacto</Button>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Input search text"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                </InputGroup>

                <hr />

                { /* Table, list every contact */ }
                <ContactsTable deleteContact={deleteContact} />
              </div>
            )
            : <p className="text-center">Loading data</p>
        }
      </main>

      { /* Modal to add contact, Also, We can create a component for this logic */}
      <Modal
        title="Agregar Contacto"
        open={isCreateModalOpen}
        onOk={() => handleOk('create')}
        onCancel={() => handleCancel('create')}
        footer={null}
      >
        <FormA
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <FormA.Item
            name="photo"
            label="URL imagen de perfil"
            rules={[{ required: true }]}
          >
            <Input />
          </FormA.Item>
          <FormA.Item
            name="name"
            label="Nombre"
            rules={[{ required: true }]}
          >
            <Input />
          </FormA.Item>
          <FormA.Item
            name="description"
            label="Descripcion"
            rules={[{ required: true }]}
          >
            <Input />
          </FormA.Item>
          <FormA.Item className="mt-5">
            <Space>
              <Button type="primary" htmlType="submit">
                Crear
              </Button>
            </Space>
          </FormA.Item>
        </FormA>
      </Modal>

      { /* Modal to remove contact */}
      <Modal title="Eliminar Contacto" open={isDeleteModalOpen} onOk={() => handleOk('delete')} onCancel={() => handleCancel('delete')}>
        <p className="text-center my-4">La acción es permanente, desea hacerlo?</p>
      </Modal>
    </div>
  )
}

export default Home;