import React from 'react'
import './WelcomeView.scss'

export default function WelcomeView() {
  return (
    <div className="welcome-view">
      <h1>Welcome!</h1>
      <span>
        <div>
        Click on a contact in the list on the left to edit its information. 
        Or, click on the plus button in the top left to create a brand new contact.
        </div>
        <div>
          Created by Mark Del Rosario. <a href="https://github.com/">Github Profile</a>
        </div>
      </span>
    </div>
  )
}
