import React, { useEffect } from 'react'
import { 
  BrowserRouter, 
  Switch, 
  Route,
  useHistory
} from 'react-router-dom'
import './App.scss'
import { ContactContextProvider, useContact } from './context/Contact'
import ContactsList from './ContactsList'
import PlusButton from './PlusButton'
import WelcomeView from './WelcomeView'
import ContactCreate from './ContactCreate'
import ContactUpdate from './ContactUpdate'

function App() {
  return (
    <BrowserRouter>
    <ContactContextProvider><Body/></ContactContextProvider>
    </BrowserRouter>
  )
}

function Body() {
  const {fetchMoreContacts} = useContact()

  const history = useHistory()

  // Fetch first page of contacts on page load
  useEffect(() => {
    fetchMoreContacts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="sidebar">
        <div className="header">
          <h1>Contacts</h1>
          <PlusButton onClick={() => history.push('/new')} size="large" />
        </div>
        <ContactsList onClick={({id}) => history.push(`/${id}`)}/>
      </div>
      <div className="content">
        <Switch>
          <Route path="/new">
            <ContactCreate />
          </Route>

          <Route path="/:contactId">
            <ContactUpdate />
          </Route>

          <Route path="/">
            <WelcomeView />
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default App
