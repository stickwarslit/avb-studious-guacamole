import React, { useState, useEffect } from 'react'
import { Contact } from './data/contacts'

interface Props {
  contact: Contact
}

export default function ContactsDisplay({contact}: Props) {
  const [firstName, setFirstName] = useState(contact.firstName)
  const [lastName, setLastName] = useState(contact.lastName)

  // Change display firstName and lastName when contact changes
  useEffect(() => {
    setFirstName(contact.firstName)
    setLastName(contact.lastName)
  }, [contact])

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)

  return (
    <article className="contact-display">
      <form>
        <label>First Name: <input type="text" value={firstName} onChange={handleFirstNameChange}/></label>
        <label>Last Name: <input type="text" value={lastName} onChange={handleLastNameChange}/></label>
      </form>
    
    </article>
  )

}
