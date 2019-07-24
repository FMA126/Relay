import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import Home from './home/Home'
import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SubHeader from './header/SubHeader'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Quotes from './quotes/Quotes'
import Quote from './quotes/Quote'
import QuoteCreate from './quotes/QuoteCreate'
import QuoteUpdate from './quotes/QuoteUpdate'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    // kinda like push but using the spread get the previous alerts and add a new alert
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        {/* user will cause a re-render if state changes with user either being null or an object  */}
        <Header user={user} />
        <SubHeader user={user} />
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
          <Route path='/home' render={() => (
            <Home />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/quotes' render={() => (
            <Quotes alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/quotes/:id' render={() => (
            <Quote alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/create-quote' render={() => (
            <QuoteCreate alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/quotes/:id/update-quote' render={() => (
            <QuoteUpdate alert={this.alert} user={user} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
