import React from 'react'
import { Contact } from './data/contacts'

interface Props {
  contact: Contact
}

export default function ContactsDisplay({contact}: Props) {
  return (
    
    <div>
      {contact.id}
      <span>{contact.firstName} {contact.lastName}</span>
    </div>
  )

}
