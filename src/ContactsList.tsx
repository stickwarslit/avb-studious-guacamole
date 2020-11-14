import React from 'react'
import './ContactsList.scss'
import { Contact } from './data/contacts'

interface Props {
  contacts: Contact[]
  onClick: (contact: Contact) => any
}

export default function ContactsList({ contacts, onClick }:Props) {
  const listItems = contacts.map(
    (contact) => 
      <li key={contact.id} onClick={() => {onClick(contact)}}>
        {contact.firstName} {contact.lastName}
      </li>
  )
  return (
    <ul className="contacts-list">
      {listItems}
    </ul>
  )
}
