import React from 'react'
import { useContact } from './context/Contact'
import './ContactsList.scss'
import { Contact } from './data/contacts'

interface Props {
  onClick: (contact: Contact) => any
}

export default function ContactsList({ onClick }:Props) {
  const { contacts } = useContact()
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
