import React, { useContext } from 'react'
import { Table } from 'react-bootstrap'
import { contactsContext } from '../context/contactsContext';
import { IContact } from '../models/contacts';

const ContactsTable = ({deleteContact}) => {
  const { contacts } = useContext(contactsContext)

  const handleDeleteContact = (contact: IContact) => {
    deleteContact(contact)
  }

  return (
    <Table responsive="sm" className='TableP'>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th className="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {
          contacts.length
          ? 
            contacts.map((contact: IContact)=> (
              <tr key={contact.id}>
                <td className="TableP__userInfo">
                  { 
                    contact.photo
                    ?  <img src={contact.photo} alt={contact.name} />
                    :  <i className="fa-solid fa-user"></i>
                  }
                  <a href="#">{contact.name}</a>
                </td>
                <td>{ contact.description }</td>
                <td className="text-center">
                  <i className="fa-solid fa-trash iconButton" onClick={() => handleDeleteContact(contact)}></i>
                </td>
              </tr>
            ))
          : <p>Sin contactos</p>
        }
        
      </tbody>
    </Table>
  )
}

export default ContactsTable
