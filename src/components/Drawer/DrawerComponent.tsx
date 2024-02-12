import { Button, Drawer, Space } from 'antd'
import React from 'react'
import { FormAgenda } from '../../pages/PagesAngeda/components/Form/FormAgenda'
import { usePageContextAngenda } from '../../pages/PagesAngeda/context/PageContextAngenda'
import { webApiService } from '../../services'
import { IAgenda } from '../../pages/PagesAngeda/models/IAgenda'
import Swal from 'sweetalert2'
import { AlertComponent } from '../Alert/AlertComponent'

// openDrawer: corresponde al valor que abre y cierra drawer
// handleOpenDrawer: corresponde al evento que permite abrir y cerra el drawer
// typeForm: correponde al tipo de formulario 1: Nuevo Registro 2: editar Registro

const DrawerComponent = ({ openDrawer, handleOpenDrawer, typeForm } : {
    openDrawer: boolean, handleOpenDrawer: any, typeForm: number
}) => {
  const { formData, setDataForm, handleLoadData, validateForm } = usePageContextAngenda()

  const saveRecordUsers = () => {
    if (validateForm()) {
      const bodyUser = {
        name: formData.name,
        description: formData.description,
        photo: formData.photo
      } as unknown as IAgenda
      if (typeForm === 2) {
        Swal.fire({
          title: 'No es posible realizar esta acción',
          text: 'Estamos tratando de solventarla lo más pronto posible',
          icon: 'info'
        })
        return
      }
      webApiService.saverUserService(bodyUser).then((resp) => {
        if (resp === 201) {
          Swal.fire({
            title: 'Excelente',
            text: 'Se ha registrado correctamente',
            icon: 'success'
          })
          setTimeout(() => {
            handleLoadData('', 1, '')
            handleResetForm() // limpio registro
          }, 1000)
        }
      })
    }
  }
  const handleResetForm = () => {
    setDataForm({
      loading: false,
      isError: false,
      name: '',
      description: '',
      photo: ''
    })
    handleOpenDrawer()
  }

  return (
    <div>

      <Drawer
        title={typeForm === 1 ? 'Nuevo Registro' : typeForm === 2 ? 'Editar Registro' : ''}
        placement='right'
        onClose={handleResetForm}
        open={openDrawer}
        extra={
          <Space>
            <Button onClick={handleResetForm}>Cancelar</Button>
            <Button
              type='primary'
              onClick={saveRecordUsers}
            >
              Guardar
            </Button>
          </Space>
        }
      >
        <FormAgenda typeForm={typeForm} />
        {typeForm === 2 && (
          <div style={{ paddingTop: '15px' }}>
            <AlertComponent
              message='No es posible realizar esta acción, la acción que permite editar esta en desarrollo'
              type='info'
            />
          </div>)}
      </Drawer>
    </div>
  )
}

export default DrawerComponent
