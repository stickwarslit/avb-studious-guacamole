import React, {useState, useEffect} from 'react'
import { Contact } from './data/contacts'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { useContact } from './context/Contact'
import ContactDisplay from './ContactDisplay'

interface Params {
  contactId: string
}

export default function ContactUpdate() {
  const { getOrFetchContact } = useContact()
  const history = useHistory()
  const params = useParams<Params>()
  const location = useLocation<{isNew?: boolean}>()

  const [contact, setContact] = useState<Contact | null>(null)
  const [isNew, setIsNew] = useState(false)

  useEffect(() => {
    const getContact = async () => {
      const contactId = parseInt(params.contactId)
      const foundContact = await getOrFetchContact(contactId)
      setContact(foundContact)
    }
    getContact()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  useEffect(() => {
    setIsNew(!!location.state.isNew)

  }, [location])

  const onCancel = () => history.push('')

  return (
    <>
      {
        contact === null
          ? "Loading..."
          : <ContactDisplay 
              contact={contact}
              onSave={() => {}}
              onCancel={onCancel}
              onDelete={onCancel}
              isNew={isNew}
            />
      }
    </>
  )

}
