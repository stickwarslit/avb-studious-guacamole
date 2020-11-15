import React, { useState, useEffect } from 'react'
import { Contact  } from './data/contacts'
import { useContact } from './context/Contact'

interface Props {
  contact: Contact
}

// Copied from http://emailregex.com/
const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email)
}


export default function ContactsDisplay({contact}: Props) {
  const { updateContact } = useContact()

  const [firstName, setFirstName] = useState(contact.firstName)
  const [lastName, setLastName] = useState(contact.lastName)
  const [emails, setEmails] = useState(contact.emails)

  const [isAddingEmail, setAddingEmail] = useState(false)
  const [newEmail, setNewEmail] = useState("")
  const [message, setMessage] = useState("")

  // Change contact display info when contact changes
  useEffect(() => {
    if (contact != null) {
      setFirstName(contact.firstName)
      setLastName(contact.lastName)
      setEmails(contact.emails)
    }
  }, [contact])

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)
  const handleNewEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewEmail(e.target.value)

  const completeNewEmail = () => {
    if (isValidEmail(newEmail)) {
      setEmails(emails.concat(newEmail))
      setNewEmail("")
      setAddingEmail(false)
    } else {
      setMessage("Invalid email address")
    }
  }

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const updatedContact: Contact = {
      ...contact,
      firstName,
      lastName,
      emails
    }

    await updateContact(updatedContact)

    setMessage("Saved Successfully")

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
          <li key={email}>{email}</li>
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

      <button onClick={handleSave}>Save</button>

      <div className="contact-message">
        {message}
      </div>
    
    </article>
  )

}
