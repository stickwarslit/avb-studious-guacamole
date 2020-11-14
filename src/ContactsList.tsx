import React from 'react'
import './ContactsList.scss'
import { Contact } from './data/contacts'

interface Props {
  contacts: Contact[]
}

export default function ContactsList({ contacts }:Props) {
  const listItems = contacts.map(
    ({id, firstName, lastName}) => 
      <li key={id}>{firstName} {lastName}</li>
  )
  return (
    <ul className="contacts-list">
      {listItems}
    </ul>
  )
}
