import React from 'react'
import { TitleComponents } from '../../components/Title/TitleComponents'
import { SearchInputs } from './components/Search/SearchInputs'
import TableData from './components/Table/TableData'
import { PageContextProviderAgenda } from './context/PageContextAngenda'
import { NewRecord } from './components/Button/NewRecord'

const PagesAngeda = () => {
  return (
    <PageContextProviderAgenda>

      <TitleComponents
        title='Agenda Previred - Mi Agenda de contacto laboral'
        descriptions='Aquí podras encontrar o buscar a todos sus contactos agregados, agregar nuevo contactos y eliminar contactos no deseados'
      />
      <NewRecord />
      <SearchInputs />
      <TableData />

    </PageContextProviderAgenda>
  )
}

export default PagesAngeda
