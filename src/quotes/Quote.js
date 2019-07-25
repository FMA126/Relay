import React, { Component } from 'react'
import { Redirect, withRouter, Link } from 'react-router-dom'
import { Media, Button } from 'react-bootstrap'
import axios from 'axios'

import Layout from './Layout'
import apiUrl from '../apiConfig'

class Quote extends Component {
  constructor (props) {
    super(props)
    this.state = {
      quote: null,
      error: null,
      deleted: false
    }
  }

  async componentDidMount () {
    try {
      const response = await axios({
        url: apiUrl + '/quotes' + `/${this.props.match.params.id}`,
        method: 'GET',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      const options = {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      }
      const dateObj = new Date(response.data.quote.pickUpDate)
      const dateObj2 = new Date(response.data.quote.createdAt)
      const formattedDate = dateObj.toLocaleDateString(undefined, options)
      const formattedDate2 = dateObj2.toLocaleDateString(undefined, options)
      this.setState({ quote: { ...response.data.quote, pickUpDate: formattedDate, createdAt: formattedDate2 }, loaded: true })
    } catch (err) {
      console.error(err)
      this.setState({ error: err.message })
    }
  }

  destroy = () => {
    // can also do axios.delete(`${apiUrl}/quotes/${this.props.match.params.id}`)
    axios({
      url: `${apiUrl}/quotes/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .then(() => this.props.alert('Deleted quote!', 'warning'))
      .catch(err => this.setState({ error: err.message }))
  }

  render () {
    const { quote, error, deleted } = this.state
    const ownerButtons = (
      <div>
        <Button onClick={this.destroy} className='mr-2' variant='danger'>Delete</Button>
        <Link to={`/quotes/${this.props.match.params.id}/update-quote`}><Button>Edit</Button></Link>
      </div>
    )

    // quote.createdAt.slice(0, 10).split('/').reverse().join('/')

    if (deleted) {
      // custom object in Redirect. 'state' can be named something else
      return <Redirect to='/quotes' />
    }
    if (error) {
      return <p>ERROR: {error}</p>
    }
    if (!quote) {
      return <p>Loading...</p>
    }

    return (
      <Layout md='8' lg='6'>
        <Media>
          <img
            width={64}
            height={64}
            className="mr-3"
            src={'https://www.uhaul.com/reservations/images/Equipment/Trucks/26Medium.png'}
            alt="Generic placeholder"
          />
          <Media.Body>
            <h2>{`${quote.pickUpLocation} to ${quote.dropOffLocation}`}</h2>
            <h4>{quote.pickUpDate}</h4>
            <p>Date Quoted: {quote.createdAt}</p>
            <p>Uhaul Prices: {quote.prices[0] ? quote.prices[0].uhaul.tenFootTruck : 'no price info'}</p>
            <p>Budget Prices: {quote.prices[1] ? quote.prices[1].budget.twelveFootTruck : 'no price info'}</p>
            <p>Penske Prices: {quote.prices[2] ? quote.prices[2].penske.twelveFootTruck : 'no price info'}</p>
            {ownerButtons}
          </Media.Body>
        </Media>
      </Layout>
    )
  }
}

export default withRouter(Quote)
