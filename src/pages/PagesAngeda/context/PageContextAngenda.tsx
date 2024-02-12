import { createContext, useContext, useMemo, useState } from 'react'
import { IAgenda } from '../models/IAgenda'
import { webApiService } from '../../../services'

import { Typography } from 'antd'
import { INCLUDES_URL } from '../../../constants/constants'

const { Title } = Typography

export const PageContextAgenda = createContext<any | null>(null)

export const PageContextProviderAgenda = ({ children }: any) => {
  const { dataAgenda, setDataAngenda, setDataForm, formData, parameters, setParameters } =
    useProviderStoreAgenda()
  const [isData, setIsData] = useState<number>(-1) // valido que todo este cargado correcto para mostrar informacion

  const handleLoadData = (q: string, _page?: number, _limit?: number) => {
    setIsData(1)
    setDataAngenda({ ...dataAgenda, loading: true, data: null })
    webApiService
      .getListLoardService()
      .then((response) => response)
      .then((data) => {
        if (data) {
          setDataAngenda({ ...dataAgenda, loading: false, data })
          data.length > 10 && setParameters({ ...parameters, _page: +1 })
        } else {
          setDataAngenda({ ...dataAgenda, loading: false, data: null })
        }
      })
      .catch((err: unknown) => {
        const error = err as Error
        console.error('Error ', error.message)
        setDataAngenda({ ...dataAgenda, loading: false, data: null })
      })
  }

  const handleLoadUserId = (q: string) => {
    setIsData(1)
    setDataAngenda({ ...dataAgenda, loading: true, data: null })
    webApiService
      .getListLoardIdUserService(q)
      .then((response) => response)
      .then((data) => {
        if (data) {
          setDataAngenda({ ...dataAgenda, loading: false, data })
          data.length > 10 && setParameters({ ...parameters, _page: +1 })
        } else {
          setDataAngenda({ ...dataAgenda, loading: false, data: null })
        }
      })
      .catch((err: unknown) => {
        const error = err as Error
        console.error('Error ', error.message)
        setDataAngenda({ ...dataAgenda, loading: false, data: null })
      })
  }

  // functions validate form()
  const validateForm = () => {
    if (!formData.photo || !formData.photo.includes(INCLUDES_URL)) {
      setDataForm({
        ...formData,
        isError: true
      })
      return false
    }
    if (!formData.name) {
      setDataForm({
        ...formData,
        isError: true
      })
      return false
    }

    if (!formData.description) {
      setDataForm({
        ...formData,
        isError: true
      })
      return false
    }
    return true
  }

  useMemo(() => {
    isData === -1 && handleLoadData(parameters.q)

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PageContextAgenda.Provider
      value={{
        dataAgenda,
        setDataAngenda,
        handleLoadData,
        setDataForm,
        formData,
        validateForm, // functions validate
        parameters,
        setParameters,
        handleLoadUserId
      }}
    >
      {isData === 1 ? children : <Title>Obteniendo informacion...</Title>}
    </PageContextAgenda.Provider>
  )
}

export const useProviderStoreAgenda = () => {
  const [parameters, setParameters] = useState<{q: string, _page?: number, _limit?: number}>({
    q: '',
    _page: 0,
    _limit: 0
  })
  const [dataAgenda, setDataAngenda] = useState<{
    loading: boolean;
    data: IAgenda[] | null;
  }>({
    loading: false,
    data: null
  })
  // datos formulario
  const [formData, setDataForm] = useState<{
    loading: boolean;
    isError: boolean;
    id?: string | number | null;
    name: string;
    description: string;
    photo: string;
  }>({
    loading: false,
    isError: false,
    id: '',
    name: '',
    description: '',
    photo: ''
  })

  return {
    dataAgenda,
    setDataAngenda,
    setDataForm,
    formData,
    parameters,
    setParameters
  }
}

export const usePageContextAngenda = () => {
  const contextPage = useContext(PageContextAgenda)

  if (contextPage === undefined) {
    throw new Error('PagesContext must be used within a previred Agenda')
  }
  return contextPage
}
