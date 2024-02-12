import { Flex, Input, Spin, Typography } from 'antd'
import React from 'react'
import { COLOR_ERROR, INCLUDES_URL } from '../../../../constants/constants'
import { usePageContextAngenda } from '../../context/PageContextAngenda'

const { Title } = Typography

export const FormAgenda = ({ typeForm }: { typeForm: number }) => {
  const { setDataForm, formData, validateForm } = usePageContextAngenda()

  return (

    <Spin spinning={formData.loading} size='large'>
      <div className='content'>
        <Flex vertical gap={7}>
          <div>
            <Title level={5}>URL Imagen Perfil</Title>
            <Input
              value={formData?.photo}
              onChange={(e) =>
                setDataForm({
                  ...formData,
                  photo: e.target.value
                })}
              onBlur={() => validateForm()}
              placeholder='Inserte URL de la imagen de perfil'
              status={(formData.isError && formData?.photo.length === 0) ? 'error' : (formData?.photo.length > 0 && !formData?.photo.includes(INCLUDES_URL)) ? 'error' : ''}
            />
            {((formData.photo.length === 0 && formData.isError) || (formData?.photo.length > 0 && !formData?.photo.includes(INCLUDES_URL))) && (
              <span style={{ margin: '8px', color: COLOR_ERROR }}>{formData?.photo.length > 0 && !formData?.photo.includes(INCLUDES_URL) ? 'Formato URL no valido' : 'Indique URL'}</span>
            )}
          </div>
          <div>
            <Title level={5}>Nombre</Title>
            <Input
              value={formData?.name}
              onChange={(e) =>
                setDataForm({
                  ...formData,
                  name: e.target.value
                })}
              onBlur={() => validateForm()}
              placeholder='Escribe el nombre del usuario'
              status={
            formData.isError && formData?.name.length === 0 ? 'error' : ''
          }
            />
            {formData?.name.length === 0 && formData.isError && (
              <span style={{ margin: '8px', color: COLOR_ERROR }}>
                Indique Nombre
              </span>
            )}
          </div>
          <div>
            <Title level={5}>Descripción</Title>
            <Input
              value={formData?.description}
              onChange={(e) =>
                setDataForm({
                  ...formData,
                  description: e.target.value
                })}
              onBlur={() => validateForm()}
              placeholder='Agregar Descripción del usuario'
              status={
            formData.isError && formData?.description.length === 0
              ? 'error'
              : ''
          }
            />
            {formData?.description.length === 0 && formData.isError && (
              <span style={{ margin: '8px', color: COLOR_ERROR }}>
                Indique Descripción
              </span>
            )}
          </div>
        </Flex>
      </div>
    </Spin>
  )
}
