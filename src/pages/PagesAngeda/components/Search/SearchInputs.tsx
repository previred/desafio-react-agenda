import { Input } from 'antd'
import React from 'react'
import { usePageContextAngenda } from '../../context/PageContextAngenda'

export const SearchInputs: React.FC = () => {
  const { handleLoadUserId } = usePageContextAngenda()

  // buscar Contactos
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value ?? ''
    handleLoadUserId(search)
  }

  return (
    <div style={{ paddingTop: '30px' }}>
      <Input
        placeholder='Buscar Contactos'
        onBlur={(e) => handleSearch(e)}
      />
    </div>
  )
}
