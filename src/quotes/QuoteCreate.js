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
        pickUpLocation: '',
        dropOffLocation: '',
        pickUpDate: ''
      },
      createdQuote: false
    }
  }

  handleChange = event => {
    // create an object with updated field
    const updatedField = {
      [event.target.name]: event.target.value
    }
    // use object to create updated state Object
    const editedQuote = Object.assign(this.state.quote, updatedField)
    // finally setState with updates object
    this.setState({ quote: editedQuote })
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
        createdQuote: true
      }))
      .then(() => this.props.alert('Creating new quote! Please check back in 30 seconds', 'success'))
      .catch(() => this.props.alert('Whoops, something went wrong. Check zip.', 'danger'))
  }

  render () {
    const { handleChange, handleSubmit } = this
    const { quote, createdQuote } = this.state

    if (createdQuote) {
      return <Redirect to={{ pathname: '/' }} />
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
