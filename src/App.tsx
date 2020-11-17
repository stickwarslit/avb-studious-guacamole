import React, { useEffect, useState } from 'react'
import './App.scss'
import { Contact } from './data/contacts'
import { ContactContextProvider, useContact } from './context/Contact'
import ContactsList from './ContactsList'
import ContactDisplay from './ContactDisplay'
import PlusButton from './PlusButton'

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

  const onCreate = () => {
    const newContact = {
      id: NaN,
      firstName: "",
      lastName: "",
      emails: []
    }

    setContact(newContact)
  }

  return (
    <>
      <div className="sidebar">
        <div className="header">
          <h1>Contacts</h1>
          <PlusButton onClick={onCreate} size="large" />
        </div>
        <ContactsList 
          onClick={ ({id}) => setContactId(id) } 
          selectedContactId={contactId}
        />
      </div>
      <div className="content">
        {
          contact
            ? <ContactDisplay 
                contact={contact} 
                onDelete={() => setContactId(null)}
                onSave={({id}) => setContactId(id)}
                onCancel={() => setContactId(null)}
              />
            : <div>Select contact on left</div>
        }
      </div>
    </>
  )
}

export default App
