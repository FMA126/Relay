import React, { Component } from 'react'
import { Redirect, withRouter, Link } from 'react-router-dom'
import { Media, Button } from 'react-bootstrap'
import axios from 'axios'

import sampleBook from './sampleBook.jpg'
import Layout from './Layout'
import apiUrl from '../apiConfig'

// import Layout from '../shared/Layout'

class Book extends Component {
  constructor (props) {
    super(props)
    this.state = {
      book: null,
      error: null,
      deleted: false
    }
  }

  async componentDidMount () {
    try {
      const response = await axios({
        url: apiUrl + '/books' + `/${this.props.match.params.id}`,
        method: 'GET',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      const options = {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }
      const dateObj = new Date(response.data.book.firstPublished)
      const formattedDate = dateObj.toLocaleDateString(undefined, options)
      this.setState({ book: { ...response.data.book, firstPublished: formattedDate }, loaded: true })
    } catch (err) {
      console.error(err)
      this.setState({ error: err.message })
    }
  }

  destroy = () => {
    // can also do axios.delete(`${apiUrl}/books/${this.props.match.params.id}`)
    axios({
      url: `${apiUrl}/books/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .then(() => this.props.alert('Deleted book!', 'warning'))
      .catch(err => this.setState({ error: err.message }))
  }

  render () {
    const { book, error, deleted } = this.state
    const { user } = this.props
    const ownerButtons = (
      <div>
        <Button onClick={this.destroy} className='mr-2' variant='danger'>Delete</Button>
        <Link to={`/books/${this.props.match.params.id}/update-book`}><Button>Edit</Button></Link>
      </div>
    )

    if (deleted) {
      // custom object in Redirect. 'state' can be named something else
      return <Redirect to='/books' />
    }
    if (error) {
      return <p>ERROR: {error}</p>
    }
    if (!book) {
      return <p>Loading...</p>
    }

    return (
      <Layout md='8' lg='6'>
        <Media>
          <img
            width={64}
            height={64}
            className="mr-3"
            src={sampleBook}
            alt="Generic placeholder"
          />
          <Media.Body>
            <h2>{book.title}</h2>
            <h4>{book.author}</h4>
            <p>Langauge: {book.originalLanguage}</p>
            <p>Date Published: {book.firstPublished}</p>
            <p>Posted by: {book.owner}</p>
            {user && user._id === book.owner ? ownerButtons : <p>Not editable</p>}
          </Media.Body>
        </Media>
      </Layout>
    )
  }
}

export default withRouter(Book)
