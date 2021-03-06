import React, {useState, createContext, useContext} from 'react'
import { 
  Contact, 
  getPage, 
  create as createRequest,
  update as updateRequest,
  del as deleteRequest,
  getOne as getOneRequest
} from '../data/contacts'

export type ContactContextType = {
  contacts: Contact[],
  lastPage: number,
  canLoadMore: boolean,
  setContactState: (contacts: Contact[]) => void,
  fetchMoreContacts: () => Promise<void>,
  deleteContact: (contact: Contact) => Promise<void>,
  upsertContact: (contact: Contact) => Promise<Contact>,
  getOrFetchContact: (contactId: number) => Promise<Contact>
}

const blankContact: Contact = {
  id: NaN,
  firstName: "",
  lastName: "",
  emails: []
}

const contextDefault: ContactContextType = {
  contacts: [],
  lastPage: 1,
  canLoadMore: true,
  setContactState: () => {},
  fetchMoreContacts: async () => {},
  deleteContact: async () => {},
  upsertContact: async () => {return blankContact},
  getOrFetchContact: async () => {return blankContact}
}

export const ContactContext = createContext<ContactContextType>(contextDefault)

interface Props {
  children: React.ReactNode
}

export const ContactContextProvider = (props: Props) => {
  const [pageNum, setPageNum] = useState(1)
  const [canLoadMore, setCanLoadMore] = useState(true)
  const [contacts, setContacts] = useState<Contact[]>([])

  const fetchMoreContacts = async () => {
    const page = await getPage(pageNum, 20)
    setCanLoadMore(page.page * page.itemsPerPage < page.totalItems)
    setPageNum(pageNum + 1)
    setContacts(contacts.concat(page.contacts))
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
    return responseContact
  }

  const upsertContact = async (contact: Contact): Promise<Contact> => {
    if (isNaN(contact.id)) {
      return await createContact(contact)
    } else {
      await updateContact(contact)
      return contact
    }
  }

  const getOrFetchContact = async (contactId: number) => {
    const localContact = contacts.find(({id}) => contactId === id)
    if (localContact !== undefined) {
      return localContact
    }

    return await getOneRequest(contactId)
  }

  const contextValue: ContactContextType = {
    contacts,
    lastPage: pageNum,
    canLoadMore: canLoadMore,
    setContactState: setContacts,
    fetchMoreContacts,
    deleteContact,
    upsertContact,
    getOrFetchContact
  }

  return (
    <ContactContext.Provider value={contextValue}>
      {props.children}
    </ContactContext.Provider>
  )
}

export const useContact = (): ContactContextType => useContext(ContactContext)

