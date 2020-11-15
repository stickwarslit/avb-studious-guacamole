import React, { useState, useEffect } from 'react'
import { Contact  } from './data/contacts'
import { useContact } from './context/Contact'


// Copied from https://ihateregex.io/expr/email/
const EMAIL_REGEX = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email)
}

interface Props {
  contact: Contact
  onDelete: (contact: Contact) => void
}

export default function ContactsDisplay({contact, onDelete}: Props) {
  const { upsertContact, deleteContact } = useContact()

  const [firstName, setFirstName] = useState(contact.firstName)
  const [lastName, setLastName] = useState(contact.lastName)
  const [emails, setEmails] = useState(contact.emails)

  const [isAddingEmail, setAddingEmail] = useState(false)
  const [newEmail, setNewEmail] = useState("")
  const [message, setMessage] = useState("")

  const refreshContactInfo = () => {
    if (contact != null) {
      setFirstName(contact.firstName)
      setLastName(contact.lastName)
      setEmails(contact.emails)
    }
  }

  // Change contact display info when contact changes
  useEffect(refreshContactInfo, [contact])

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)
  const handleNewEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewEmail(e.target.value)

  const completeNewEmail = () => {
    if (isValidEmail(newEmail)) {
      setEmails(emails.concat(newEmail))
      setNewEmail("")
      setAddingEmail(false)
      setMessage("")
    } else {
      setMessage("Invalid email address")
    }
  }

  const removeEmail = (emailToDelete: string) => {
    setEmails(emails.filter(email => email !== emailToDelete))
  }

  const handleSave = async () => {
    if (firstName === "") {
      setMessage("Must have First Name")
      return
    }

    if (lastName === "") {
      setMessage("Must have Last Name")
      return
    }

    const updatedContact: Contact = {
      ...contact,
      firstName,
      lastName,
      emails
    }

    await upsertContact(updatedContact)

    setMessage("Saved Successfully")
  }

  const handleDelete = async () => {
    await deleteContact(contact)
    onDelete(contact)
  }

  return (
    <article className="contact-display">
      <label>First Name: </label>
      <input type="text" value={firstName} onChange={handleFirstNameChange}/>
      <label>Last Name: </label>
      <input type="text" value={lastName} onChange={handleLastNameChange}/>

      <label>Emails</label>
      <ul>
        { emails.map(email => 
          <li key={email}>
            {email}
            <button onClick={() => removeEmail(email)}>Remove</button>
          </li>
        )}
        <li>
        { isAddingEmail
            ? <>
                <label>New Email: </label> 
                <input type="text" value={newEmail} onChange={handleNewEmailChange} />
                <button onClick={completeNewEmail}>Complete</button>
              </>
            : <>
                <button onClick={() => setAddingEmail(true)}>
                  add email
                </button>
              </>
        }
        </li>
      </ul>

      <div className="buttons">
        <button onClick={handleDelete}>Delete</button>
        <button onClick={refreshContactInfo}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>

      <div className="contact-message">
        {message}
      </div>
    
    </article>
  )

}
