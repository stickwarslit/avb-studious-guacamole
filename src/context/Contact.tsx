import React, {useState, createContext, useContext} from 'react'
import { 
  Contact, 
  getPage, 
  create as createRequest,
  update as updateRequest,
  del as deleteRequest
} from '../data/contacts'

export type ContactContextType = {
  contacts: Contact[],
  lastPage: number,
  setContactState: (contacts: Contact[]) => void,
  fetchMoreContacts: () => Promise<void>,
  deleteContact: (contact: Contact) => Promise<void>,
  upsertContact: (contact: Contact) => Promise<void>
}

const contextDefault: ContactContextType = {
  contacts: [],
  lastPage: 1,
  setContactState: () => {},
  fetchMoreContacts: async () => {},
  deleteContact: async () => {},
  upsertContact: async () => {}
}

export const ContactContext = createContext<ContactContextType>(contextDefault)

interface Props {
  children: React.ReactNode
}

export const ContactContextProvider = (props: Props) => {
  const [page, setPage] = useState(1)
  const [contacts, setContacts] = useState<Contact[]>([])

  const fetchMoreContacts = async () => {
    const newContacts = await getPage(page, 20)
    setPage(page + 1)
    setContacts(contacts.concat(newContacts))
  }

  const deleteContact = async (contactToDelete: Contact) => {
    await deleteRequest(contactToDelete)
    const updatedContacts = contacts.filter(({id}) => id !== contactToDelete.id)
    setContacts(updatedContacts)
  }

  const updateContact = async (updated: Contact) => {
    await updateRequest(updated)
    const updatedContacts = contacts.map((contact) =>  {
      return contact.id === updated.id
        ? updated
        : contact
    })
    setContacts(updatedContacts)
  }

  const createContact = async (contact: Contact) => {
    const responseContact = await createRequest(contact)
    setContacts(contacts.concat(responseContact))
  }

  const upsertContact = async (contact: Contact) => {
    if (isNaN(contact.id)) {
      await createContact(contact)
    } else {
      await updateContact(contact)
    }
  }

  const contextValue: ContactContextType = {
    contacts,
    lastPage: page,
    setContactState: setContacts,
    fetchMoreContacts,
    deleteContact,
    upsertContact
  }

  return (
    <ContactContext.Provider value={contextValue}>
      {props.children}
    </ContactContext.Provider>
  )
}

export const useContact = (): ContactContextType => useContext(ContactContext)

