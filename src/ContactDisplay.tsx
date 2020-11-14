import React, { useState, useEffect } from 'react'
import { Contact, update as sendUpdateRequest } from './data/contacts'

interface Props {
  contact: Contact
  onSave: (contact: Contact) => void
}

export default function ContactsDisplay({contact, onSave}: Props) {
  const [message, setMessage] = useState("")
  const [firstName, setFirstName] = useState(contact.firstName)
  const [lastName, setLastName] = useState(contact.lastName)

  // Change display firstName and lastName when contact changes
  useEffect(() => {
    setFirstName(contact.firstName)
    setLastName(contact.lastName)
  }, [contact])

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const updatedContact: Contact = {
      ...contact,
      firstName,
      lastName
    }

    await sendUpdateRequest(updatedContact)

    setMessage("Saved Successfully")

  }

  return (
    <article className="contact-display">
        <label>First Name: <input type="text" value={firstName} onChange={handleFirstNameChange}/></label>
        <label>Last Name: <input type="text" value={lastName} onChange={handleLastNameChange}/></label>

        <button onClick={handleSave}>Save</button>

      <div className="contact-message">
        {message}
      </div>
    
    </article>
  )

}
