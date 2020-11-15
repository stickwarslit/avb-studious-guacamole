export interface Contact {
  id: number
  firstName: string
  lastName: string
  emails: Array<string>
}

const BASE_URL = "https://avb-contacts-api.herokuapp.com"

export const getPage = async (pageNum = 1, pageSize = 20): Promise<Contact[]> => {
  const url = `${BASE_URL}/contacts/paginated?page=${pageNum}&itemsPerPage=${pageSize}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const body = await response.json()

  return body.contacts as Contact[]
}

export const update = async (contact: Contact): Promise<void> => {
  const url = `${BASE_URL}/contacts/${contact.id}`

  const params = {
    method: 'PUT',
    headers: {
      accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contact)
  }

  const response = await fetch(url, params)

  if (!response.ok) {
    throw new Error(response.statusText)
  }
}

export const del = async (contact: Contact): Promise<void> => {
  if (isNaN(contact.id)) {
    return
  }

  const url = `${BASE_URL}/contacts/${contact.id}`

  const params = { method: 'DELETE' }

  const response = await fetch(url, params)

  if (!response.ok) {
    throw new Error(response.statusText)
  }
}

export const create = async (contact: Contact): Promise<Contact> => {
  const url = `${BASE_URL}/contacts`

  const params = {
    method: 'POST',
    headers: {
      accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contact)
  }

  const response = await fetch(url, params)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const updatedContact = await response.json()

  return updatedContact as Contact
}
