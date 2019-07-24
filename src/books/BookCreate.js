import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import apiUrl from '../apiConfig'
import BookForm from './BookForm'
import Layout from './Layout'

import axios from 'axios'

class BookCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      book: {
        title: '',
        author: '',
        originalLanguage: '',
        firstPublished: ''
      },
      createdBookId: null
    }
  }

  handleChange = event => {
    // create an object with updated field
    const updatedField = {
      [event.target.name]: event.target.value
    }
    // use object to create updated state Object
    const editedBook = Object.assign(this.state.book, updatedField)
    // finally setState with updates object
    this.setState({ book: editedBook })
  }

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: apiUrl + '/books',
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        book: this.state.book
      }
    })
      .then(res => this.setState({
        createdBookId: res.data.book._id
      }))
      .then(() => this.props.alert('Created new book!', 'warning'))
      .catch(console.error)
  }

  render () {
    const { handleChange, handleSubmit } = this
    const { book, createdBookId } = this.state

    if (createdBookId) {
      return <Redirect to={`/books/${createdBookId}`} />
    }

    return (
      <Layout md='6' lg='8'>
        <h4>Create a new book</h4>
        <BookForm
          book={book}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath="/books"
        />
      </Layout>
    )
  }
}

export default BookCreate
