import React, { useEffect } from 'react'
import './App.scss'
import { Contact, getPage } from './data/contacts'

function App() {
  useEffect(() => {
    const getContacts = async () => {
      const contacts: Contact[] = await getPage()
      console.log({contacts})
    }
    getContacts()
  }, [])

  return (
    <>
      <div className="sidebar">hello</div>
      <div className="content">goodbye</div>
    </>
  )
}

export default App
