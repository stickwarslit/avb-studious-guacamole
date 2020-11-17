import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useContact } from './context/Contact'
import './ContactsList.scss'
import { Contact } from './data/contacts'

interface Props {
  onClick: (contact: Contact) => any
}

interface Params {
  contactId?: string
}

export default function ContactsList({ onClick }:Props) {
  const { contacts, fetchMoreContacts, canLoadMore } = useContact()
  const match = useRouteMatch<Params>('/:contactId')

  const [selectedContactId, setSelectedContactId] = useState(NaN)

  useEffect(() => {
    if (match !== null && match.params.contactId !== undefined) {
      setSelectedContactId(parseInt(match.params.contactId, 10))
    }
  }, [match])

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
