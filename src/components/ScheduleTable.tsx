import React, { useContext, useEffect, useState } from "react";
import { Button, Image, Pagination, PaginationProps, Table, TableProps } from 'antd';
import { ContactContext } from "../context/ContactContext.tsx";
import { DeleteOutlined } from '@ant-design/icons';

interface DataType {
  id: number;
  name: string;
  description: string;
  photo: string;
}

export const ScheduleTable = (): JSX.Element => {
  const context = useContext(ContactContext);

  if (!context) {
    throw new Error('Context Error');
  }

  const { contactsData, getAllContacts, getContactsPerPage, deleteContact, totalData, currentPage, setCurrentPageFunction } = context

  const onChange: PaginationProps['onChange'] = async (page) => {
    setCurrentPageFunction(page);
    await getContactsPerPage(page);
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
      render: (_, record) => (
        <>
          <Image
            width={60}
            src={record.photo}
            onError={(e) => e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg'}
            className="pd-r-20"
          /> <a>{record.name}</a>
        </>
      ),
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      width: '75%'
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, record) => (
        <Button shape="circle" icon={<DeleteOutlined />} onClick={() => deleteItem(record.id)} />
      ),
      width: '10%',
      align: 'center'
    },
  ];

  useEffect(() => {
    const useEffectFunctions = async () => {
      await getAllContacts();
      await getContactsPerPage(1);
    };
    
    useEffectFunctions();
  }, [])

  const deleteItem = async (id) => {
    await deleteContact(id);

    // reset pagination
    await getAllContacts();
    await getContactsPerPage(1);
    setCurrentPageFunction(1);
  }

  return (
    <>
      <Table columns={columns} dataSource={contactsData} rowKey="id" pagination={false} />
      <Pagination defaultCurrent={1} current={currentPage} onChange={onChange} total={totalData} pageSize={5} />
    </>
  )
}