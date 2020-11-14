import React, { useEffect, useState } from 'react'
import './App.scss'
import { Contact, getPage} from './data/contacts'
import ContactsList from './ContactsList'
import ContactDisplay from './ContactDisplay'

function updateContact(contacts: Contact[], updated: Contact): Contact[] {
  return contacts.map(contact => {
    if (contact.id === updated.id) {
      return updated
    } else {
      return contact
    }
  })
}

function App() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  useEffect(() => {
    const getContacts = async () => {
      const contacts = await getPage()
      setContacts(contacts)
    }
    getContacts()
  }, [])

  const onSave = (contact: Contact): void => {
    const updateServer = async () => {
      const newContacts = updateContact(contacts, contact)
      setContacts(newContacts)
    }
    updateServer()
  }

  return (
    <>
      <div className="sidebar">
        <h1>Contacts</h1>
        { contacts.length > 0
          ? <ContactsList contacts={contacts} onClick={setSelectedContact} />
          : <div>Loading contacts</div>
        }
      </div>
      <div className="content">
        { selectedContact
          ? <ContactDisplay contact={selectedContact} onSave={onSave}/>
          : <div>Please select a contact in the left</div>
        }
      </div>
    </>
  )
}

export default App
