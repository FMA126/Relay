import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

import axios from 'axios'
import apiUrl from '../apiConfig'

class Quotes extends Component {
  constructor (props) {
    super(props)
    this.state = {
      quotes: [],
      loaded: false,
      isDeleted: false,
      error: null
    }
  }

  async componentDidMount () {
    try {
      const response = await axios({
        url: apiUrl + '/quotes',
        method: 'GET',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      this.setState({ quotes: response.data.quotes, loaded: true })
    } catch (err) {
      console.error(err)
      this.setState({ error: err.message })
    }
  }

  render () {
    const { quotes, error, loaded } = this.state
    const quotesList = quotes.map((quote, index) => (
      <tr key={quote._id}>
        <td>
          <Link to={`/quotes/${quote._id}`}>{index + 1}</Link>
        </td>
        <td>{quote.pickUpDate}</td>
        <td>{quote.pickUpLocation}</td>
        <td>{quote.dropOffLocation}</td>
        <td>{quote.createdAt.slice(0, 10)}</td>
      </tr>
    ))

    if (!loaded) {
      return <p>Loading...</p>
    }

    if (quotes.length === 0) {
      return <p>No quotes</p>
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
              <th>Pick Up Date</th>
              <th>Start Location</th>
              <th>End Location</th>
              <th>Quoted On</th>
            </tr>
          </thead>
          <tbody>
            {quotesList}
          </tbody>
        </Table>
      </React.Fragment>
    )
  }
}

export default Quotes
