import React, { useEffect, useState } from 'react'
import './App.scss'
import { Contact, getPage } from './data/contacts'
import ContactsList from './ContactsList'
import ContactDisplay from './ContactDisplay'

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
          ? <ContactDisplay contact={selectedContact} />
          : <div>Please select a contact in the left</div>
        }
      </div>
    </>
  )
}

export default App
