import React, { Component } from 'react'
import { Redirect, withRouter, Link } from 'react-router-dom'
import { Media, Button } from 'react-bootstrap'
import axios from 'axios'

import Layout from './Layout'
import apiUrl from '../apiConfig'

// const images = {
//   Uhaul: {
//     logo: 'https://www.uhaul.com/Images/uhaul-logo.png?3c2373e7=1290732713',
//     ten: 'https://www.uhaul.com/reservations/images/Equipment/Trucks/10Medium.png',
//     fifteen: 'https://www.uhaul.com/reservations/images/Equipment/Trucks/14Medium.png',
//     tweenty: 'https://www.uhaul.com/reservations/images/Equipment/Trucks/20Medium.png',
//     tweentySix: 'https://www.uhaul.com/reservations/images/Equipment/Trucks/26Medium.png'
//   },
//   budget: {
//     logo: 'https://www.budgettruck.com/portals/budgettruck/logo.png',
//     twelve: 'https://www.budgettruck.com/Portals/BudgetTruck/Skins/Budget-Default/images/Truck/12ft_moving_truck.jpg',
//     sixteen: 'https://www.budgettruck.com/Portals/BudgetTruck/Skins/Budget-Default/images/Truck/16ft_moving_truck.jpg'
//   },
//   penske: {
//     logo: 'https://static.gopenske.com/internet/img/penskelogo.png',
//     twelve: 'https://www.pensketruckrental.com/img/app/trucks/12-foot-truck.png',
//     sixteen: 'https://www.pensketruckrental.com/img/app/trucks/16-foot-truck.png',
//     tweentyTwo: 'https://www.pensketruckrental.com/img/app/trucks/22-foot-truck.png',
//     twentySix: 'https://www.pensketruckrental.com/img/app/trucks/26-foot-truck.png'
//   }
// }

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
            <p>Uhaul Prices:</p>
            <p> 10 ft truck: {quote.prices[0] ? quote.prices[0].uhaul ? quote.prices[0].uhaul.tenFootTruck : 'no price info' : 'no price info'}</p>
            <p> 15 ft truck: {quote.prices[0] ? quote.prices[0].uhaul ? quote.prices[0].uhaul.fifteenFootTruck : 'no price info' : 'no price info'}</p>
            <p> 20 ft truck: {quote.prices[0] ? quote.prices[0].uhaul ? quote.prices[0].uhaul.twentyFootTruck : 'no price info' : 'no price info'}</p>
            <p> 26 ft truck: {quote.prices[0] ? quote.prices[0].uhaul ? quote.prices[0].uhaul.twentySixFootTruck : 'no price info' : 'no price info'}</p>
            <p>Budget Prices:</p>
            <p>12 ft truck: {quote.prices[1] ? quote.prices[1].budget ? quote.prices[1].budget.twelveFootTruck : 'no price info' : 'no price info'}</p>
            <p>16 ft truck: {quote.prices[1] ? quote.prices[1].budget ? quote.prices[1].budget.sixteenFootTruck : 'no price info' : 'no price info'}</p>
            <p>26 ft truck: {quote.prices[1] ? quote.prices[1].budget ? quote.prices[1].budget.twentySixFootTruck : 'no price info' : 'no price info'}</p>
            <p>Penske Prices:</p>
            <p>12 ft truck: {quote.prices[2] ? quote.prices[2].penske ? quote.prices[2].penske.twelveFootTruck : 'no price info' : 'no price info'}</p>
            <p>12 ft truck: {quote.prices[2] ? quote.prices[2].penske ? quote.prices[2].penske.sixteenFootTruck : 'no price info' : 'no price info'}</p>
            <p>12 ft truck: {quote.prices[2] ? quote.prices[2].penske ? quote.prices[2].penske.twentyTwoFootTruck : 'no price info' : 'no price info'}</p>
            <p>12 ft truck: {quote.prices[2] ? quote.prices[2].penske ? quote.prices[2].penske.twentySixFootTruck : 'no price info' : 'no price info'}</p>

            {ownerButtons}
          </Media.Body>
        </Media>
      </Layout>
    )
  }
}

export default withRouter(Quote)
