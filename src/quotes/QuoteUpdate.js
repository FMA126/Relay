import React, { Component } from 'react'

import axios from 'axios'

import Layout from './Layout'
import QuoteForm from './QuoteForm'
import apiUrl from '../apiConfig'
import { Redirect, withRouter } from 'react-router-dom'

class QuoteUpdate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      quote: {
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
      url: `${apiUrl}/quotes/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => {
        const dateObj = new Date(res.data.quote.firstPublished)
        const formattedDate = dateObj.toISOString().substring(0, 10)
        this.setState({
          quote: {
            ...res.data.quote,
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
    // combine the prev object with the quote object
    const editedQuote = Object.assign(this.state.quote, updatedField)
    // use setState to update the state with our combined object
    this.setState({ quote: editedQuote })
  }

  handleSubmit = event => {
    event.preventDefault()
    // on submit - Patch request
    axios({
      url: `${apiUrl}/quotes/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        quote: this.state.quote
      }
    })
      .then(res => this.setState({ edited: true }))
      .then(() => this.props.alert('Updated quote!', 'warning'))
      .catch(console.error)
  }

  render () {
    const { handleChange, handleSubmit } = this
    const { quote, edited } = this.state
    // const quoteId = this.props.match.params.id

    if (edited) {
      return <Redirect to={
        {
          pathname: `/quotes/${this.props.match.params.id}`
        }
      } />
    }

    return (
      <Layout>
        <h3>Edit Quote</h3>
        <QuoteForm
          quote={quote}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath={`/quotes/${this.props.match.params.id}`}
        />
      </Layout>
    )
  }
}

export default withRouter(QuoteUpdate)
