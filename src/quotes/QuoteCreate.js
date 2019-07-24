import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import apiUrl from '../apiConfig'
import QuoteForm from './QuoteForm'
import Layout from './Layout'

import axios from 'axios'

class QuoteCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      quote: {
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
    const editedBook = Object.assign(this.state.quote, updatedField)
    // finally setState with updates object
    this.setState({ quote: editedBook })
  }

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: apiUrl + '/quotes',
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        quote: this.state.quote
      }
    })
      .then(res => this.setState({
        createdBookId: res.data.quote._id
      }))
      .then(() => this.props.alert('Created new quote!', 'warning'))
      .catch(console.error)
  }

  render () {
    const { handleChange, handleSubmit } = this
    const { quote, createdBookId } = this.state

    if (createdBookId) {
      return <Redirect to={`/quotes/${createdBookId}`} />
    }

    return (
      <Layout md='6' lg='8'>
        <h4>Create a new quote</h4>
        <QuoteForm
          quote={quote}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath="/quotes"
        />
      </Layout>
    )
  }
}

export default QuoteCreate
