/* eslint-disable jsx-a11y/anchor-is-valid */
import { Avatar, Space, Spin, Table, TableProps } from 'antd'
import React from 'react'
import { usePageContextAngenda } from '../../context/PageContextAngenda'
import { DeleteOutlined, UserDeleteOutlined } from '@ant-design/icons'
import Swal from 'sweetalert2'
import { webApiService } from '../../../../services'
import DrawerComponent from '../../../../components/Drawer/DrawerComponent'
import { IAgenda } from '../../models/IAgenda'

export interface IDataType {
  key: string;
  id: number;
  name: string;
  description: string;
  photo: string;
}

const TableData: React.FC = () => {
  const { dataAgenda, handleLoadData, setDataForm, formData, parameters } = usePageContextAngenda()
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false)

  const searchUser = async (id: string | number) => {
    setDataForm({ ...formData, loading: true })
    if (id !== undefined || null) {
      webApiService.searchUserIdService(id).then((resp: IAgenda) => {
        if (resp) {
          setDataForm({
            ...formData,
            id: resp.id ?? '',
            name: resp.name ?? '',
            description: resp.description ?? '',
            photo: resp.photo ?? ''
          })
          setTimeout(() => {
            setDataForm({ ...formData, loading: false })
            handleOpenDrawer() // levando el drawer
          }, 1000)
        } else {
          setDataForm({ ...formData, dataForm: null, loading: false })
        }
      }).catch((err: unknown) => {
        const error = err as Error
        console.error('Error obtener registro id: ', error.message)
        setDataForm({ ...formData, dataForm: null, loading: false })
      })
    }
  }

  const handleDelete = (id: string | number) => {
    Swal.fire({
      title: '¿Eliminar?',
      text: `Quieres eliminar registro seleccionado ${id}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#0B6BFC',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        webApiService.deleteUserService(id).then((resp) => {
          if (resp) {
            Swal.fire({
              title: 'Se ha eliminado correctamente',
              text: '',
              icon: 'success'
            })
            setTimeout(() => {
              handleLoadData(parameters.q, parameters._page, parameters._limit)
            }, 1000)
          } else {
            Swal.fire({
              title: '',
              text: 'tenemos inconveniente para mostrar registro',
              icon: 'success'
            })
          }
        })
      } else {
        Swal.fire({
          title: 'Se cancelo el registro',
          text: '',
          icon: 'info'
        })
      }
    })
  }

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  const columns: TableProps<IDataType>['columns'] = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      render: (_, x) => (
        <Space size='middle'>
          {x.photo ? <Avatar src={x.photo} /> : <Avatar size='small' icon={<UserDeleteOutlined />} />}
          <a onClick={() => searchUser(x.id)}>{x.name}</a>
        </Space>
      )
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description'
    },

    {
      title: 'Acciones',
      key: 'action',
      render: (_, x) => (
        <Space size='middle' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <DeleteOutlined style={{ fontSize: '20px' }} onClick={() => handleDelete(x.id)} />
        </Space>
      )
    }
  ]

  const data: IDataType[] = dataAgenda?.data

  return (
    <div style={{ paddingTop: '23px' }}>

      <Spin spinning={dataAgenda.loading || formData.loading} size='large'>
        <div className='content'>
          <Table
            columns={columns}
            dataSource={data ?? []}
            pagination={{ pageSize: 10, total: data?.length, showSizeChanger: false }}
          />
        </div>
      </Spin>
      {/** Drawer */}
      <DrawerComponent
        openDrawer={openDrawer}
        handleOpenDrawer={handleOpenDrawer}
        typeForm={2}

      />
    </div>
  )
}

export default TableData
