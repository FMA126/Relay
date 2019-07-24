import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

import axios from 'axios'
import apiUrl from '../apiConfig'

class Books extends Component {
  constructor (props) {
    super(props)
    this.state = {
      books: [],
      loaded: false,
      isDeleted: false,
      error: null
    }
  }

  async componentDidMount () {
    try {
      const response = await axios({
        url: apiUrl + '/books',
        method: 'GET',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      this.setState({ books: response.data.books, loaded: true })
    } catch (err) {
      console.error(err)
      this.setState({ error: err.message })
    }
  }

  render () {
    const { books, error, loaded } = this.state
    const booksList = books.map((book, index) => (
      <tr key={book._id}>
        <td>
          <Link to={`/books/${book._id}`}>{index + 1}</Link>
        </td>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.originalLanguage}</td>
        <td>{book.firstPublished ? book.firstPublished.slice(0, 10) : ''}</td>
      </tr>
    ))

    if (!loaded) {
      return <p>Loading...</p>
    }

    if (books.length === 0) {
      return <p>No books</p>
    }

    if (error) {
      return <p>Error: {error}</p>
    }

    return (
      <React.Fragment>
        <Table striped bordered hover variant="dark">
          <thead className="bg-dark text-white-50">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Original Langauge</th>
              <th>Date Published</th>
            </tr>
          </thead>
          <tbody>
            {booksList}
          </tbody>
        </Table>
      </React.Fragment>
    )
  }
}

export default Books
