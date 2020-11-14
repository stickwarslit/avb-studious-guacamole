export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
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
