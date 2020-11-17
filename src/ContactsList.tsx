import React, { useState } from 'react'
import { useContact } from './context/Contact'
import './ContactsList.scss'
import { Contact } from './data/contacts'

interface Props {
  onClick: (contact: Contact) => any
  selectedContactId: number | null
}

export default function ContactsList({ onClick, selectedContactId }:Props) {
  const { contacts, fetchMoreContacts, canLoadMore } = useContact()

  const [isLoading, setIsLoading] = useState(false)

  const handleLoad = async () => {
    setIsLoading(true)
    await fetchMoreContacts()
    setIsLoading(false)
  }

  const listItems = contacts.map(
    (contact) => 
      <li 
        key={contact.id} 
        onClick={() => {onClick(contact)}}
        className={selectedContactId === contact.id ? "selected" : ""}
      >
        {contact.firstName} {contact.lastName}
      </li>
  )

  const loadButton = 
    canLoadMore
      ? <li>
          {
            isLoading
              ? "Loading..."
              : <button onClick={handleLoad}>Load more</button>
          }
        </li>
      : ""

  return (
    <ul className="contacts-list">
      {listItems}
      {loadButton}
    </ul>

  )
}
