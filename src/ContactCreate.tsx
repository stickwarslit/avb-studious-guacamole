import React from 'react'
import { useHistory } from 'react-router-dom'
import { Contact } from './data/contacts'
import ContactDisplay from './ContactDisplay'

export default function ContactCreate() {
  const history = useHistory()

  const blankContact: Contact = {
    id: NaN,
    firstName: "",
    lastName: "",
    emails: []
  }

  const onSave = (contact: Contact) => history.push(`/${contact.id}`)
  const onCancel = () => history.push('')

  return (
    <>
      <ContactDisplay 
        contact={blankContact}
        onSave={onSave}
        onCancel={onCancel}
        onDelete={onCancel}
      />
    </>
  )
}
