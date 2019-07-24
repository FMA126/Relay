import React, { Component } from 'react'

import axios from 'axios'

import Layout from './Layout'
import BookForm from './BookForm'
import apiUrl from '../apiConfig'
import { Redirect, withRouter } from 'react-router-dom'

class BookUpdate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      book: {
        title: '',
        author: '',
        originalLanguage: '',
        firstPublished: ''
      },
      edited: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/books/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => {
        const dateObj = new Date(res.data.book.firstPublished)
        const formattedDate = dateObj.toISOString().substring(0, 10)
        this.setState({
          book: {
            ...res.data.book,
            firstPublished: formattedDate
          }
        })
      })
      .catch(console.error)
  }

  handleChange = event => {
    // create object with just the updated field name and the updated
    // value => { title: 'My Mo' }
    const updatedField = {
      [event.target.name]: event.target.value
    }
    // combine the prev object with the book object
    const editedBook = Object.assign(this.state.book, updatedField)
    // use setState to update the state with our combined object
    this.setState({ book: editedBook })
  }

  handleSubmit = event => {
    event.preventDefault()
    // on submit - Patch request
    axios({
      url: `${apiUrl}/books/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        book: this.state.book
      }
    })
      .then(res => this.setState({ edited: true }))
      .then(() => this.props.alert('Updated book!', 'warning'))
      .catch(console.error)
  }

  render () {
    const { handleChange, handleSubmit } = this
    const { book, edited } = this.state
    // const bookId = this.props.match.params.id

    if (edited) {
      return <Redirect to={
        {
          pathname: `/books/${this.props.match.params.id}`
        }
      } />
    }

    return (
      <Layout>
        <h3>Edit Book</h3>
        <BookForm
          book={book}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath={`/books/${this.props.match.params.id}`}
        />
      </Layout>
    )
  }
}

export default withRouter(BookUpdate)
