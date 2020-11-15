import React, { useEffect, useState } from 'react'
import './App.scss'
import { Contact } from './data/contacts'
import { ContactContextProvider, useContact } from './context/Contact'
import ContactsList from './ContactsList'
import ContactDisplay from './ContactDisplay'

function App() {
  return (
    <ContactContextProvider><Body/></ContactContextProvider>
  )
}

function Body() {
  const {contacts, fetchMoreContacts} = useContact()

  const [contactId, setContactId] = useState<number | null>(null)
  const [contact, setContact] = useState<Contact | null>(null)

  // Fetch first page of contacts on page load
  useEffect(() => {
    fetchMoreContacts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const result = contacts.find(({id}) => id === contactId)
    if (result !== undefined) {
      setContact(result)
    } else {
      setContact(null)
    }
  }, [contacts, contactId])

  return (
    <>
      <div className="sidebar">
        <h1>Contacts</h1>
        <ContactsList onClick={ ({id}) => setContactId(id) }/>
      </div>
      <div className="content">
        {
          contact
            ? <ContactDisplay 
                contact={contact} 
                onDelete={() => setContactId(null)}
              />
            : <div>Select contact on left</div>
        }
      </div>
    </>
  )
}

export default App
