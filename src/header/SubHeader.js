import React from 'react'
// import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

const authenticatedOptionsResource = (
  <React.Fragment>
    <Nav.Item>
      <Nav.Link href="#books">All Books</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="#create-book">Create A Book</Nav.Link>
    </Nav.Item>
  </React.Fragment>
)

const unAuthenticatedOptionsResource = (
  <Nav.Item>
    <Nav.Item>Icon</Nav.Item>
  </Nav.Item>
)
// <nav className="nav nav-dark">
//   { user ? authenticatedOptionsResource : unAuthenticatedOptionsResource }
// </nav>

const SubHeader = ({ user }) => (
  <Nav variant="tabs">
    { user ? authenticatedOptionsResource : unAuthenticatedOptionsResource }
  </Nav>

)

export default SubHeader
