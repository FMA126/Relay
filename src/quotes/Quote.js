import React, { Component } from 'react'
import { Redirect, withRouter, Link } from 'react-router-dom'
import { Media, Button } from 'react-bootstrap'
import axios from 'axios'

import Layout from './Layout'
import apiUrl from '../apiConfig'

// import Layout from '../shared/Layout'

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
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }
      const dateObj = new Date(response.data.quote.firstPublished)
      const formattedDate = dateObj.toLocaleDateString(undefined, options)
      this.setState({ quote: { ...response.data.quote, firstPublished: formattedDate }, loaded: true })
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
    const { user } = this.props
    const ownerButtons = (
      <div>
        <Button onClick={this.destroy} className='mr-2' variant='danger'>Delete</Button>
        <Link to={`/quotes/${this.props.match.params.id}/update-quote`}><Button>Edit</Button></Link>
      </div>
    )

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
            src={'nothing'}
            alt="Generic placeholder"
          />
          <Media.Body>
            <h2>{`${quote.pickUpLocation} to ${quote.dropOffLocation}`}</h2>
            <h4>{quote.pickUpDate}</h4>
            <p>Date Quoted: {quote.createdAt.slice(0, 10)}</p>
            <p>Uhaul Prices: {quote.prices[0] ? quote.prices[0].uhaul.tenFootTruck : 'no price info'}</p>
            <p>Budget Prices: {quote.prices[1] ? quote.prices[1].budget.twelveFootTruck : 'no price info'}</p>
            <p>Penske Prices: {quote.prices[2] ? quote.prices[2].penske.twelveFootTruck : 'no price info'}</p>
            {user && user._id === quote.owner ? ownerButtons : <p>Not editable</p>}
          </Media.Body>
        </Media>
      </Layout>
    )
  }
}

export default withRouter(Quote)
