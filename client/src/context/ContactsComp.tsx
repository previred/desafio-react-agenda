import React, { useState } from 'react'
import { contactsContext } from './contactsContext'
import { IContact } from '../models/contacts'

/**
 * Composable with CRUD methods to manage global state for app
 */
const ContactsComp = ({ children }) => {
  const [contacts, setContacts] = useState<IContact[]>([])
  const [loadingData, setLoadingData] = useState(true)

  const initContacts = (contacts: Array<IContact>) => {
    setContacts(contacts)
    setLoadingData(false)
  }

  const addContact = (contact: IContact) => {
    setContacts((oldContacts) => [...oldContacts, contact])
  }

  const removeContact = (id: number) => {
    setContacts((oldContacts) => oldContacts.filter((contact: IContact) => contact.id !== id))
  }

  const editContact = (contact: IContact) => {
    console.log('edit contact')
  }

  return (
    <contactsContext.Provider
      value= {{
        contacts,
        loadingData,
        initContacts,
        addContact,
        removeContact,
        editContact
      }}
    >
      { children }
    </contactsContext.Provider>
  )
}

export default ContactsComp
