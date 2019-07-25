import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

let today = new Date()
let dd = today.getDate()

let mm = today.getMonth() + 1
const yyyy = today.getFullYear()
if (dd < 10) {
  dd = '0' + dd
}

if (mm < 10) {
  mm = '0' + mm
}

today = yyyy + '-' + mm + '-' + dd

const QuoteForm = ({ quote, handleSubmit, handleChange, cancelPath }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="pickUpLocation">
      <Form.Label>Start Location</Form.Label>
      <Form.Control
        type="number"
        max="99999"
        placeholder="Zip"
        name="pickUpLocation"
        value={quote.pickUpLocation}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Form.Group controlId="dropOffLocation">
      <Form.Label>Drop Off Location</Form.Label>
      <Form.Control
        type="number"
        max="99999"
        placeholder="Zip"
        name="dropOffLocation"
        value={quote.dropOffLocation}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Form.Group controlId="pickUpDate">
      <Form.Label>Date</Form.Label>
      <Form.Control
        type="date"
        name="pickUpDate"
        min={today}
        value={quote.pickUpDate}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Button className="mr-2" type="submit">Submit</Button>
    <Link to={cancelPath}>
      <Button>Cancel</Button>
    </Link>
  </Form>
)

export default QuoteForm
