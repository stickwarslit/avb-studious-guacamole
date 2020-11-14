import React, { useEffect, useState } from 'react'
import './App.scss'
import { Contact, getPage } from './data/contacts'
import ContactsList from './ContactsList'

function App() {
  const [contacts, setContacts] = useState<Contact[]>([])

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
        { contacts.length > 0
          ? <ContactsList contacts={contacts} />
          : <div>Loading contacts</div>
        }
      </div>
      <div className="content">goodbye</div>
    </>
  )
}

export default App
