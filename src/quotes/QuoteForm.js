import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const QuoteForm = ({ quote, handleSubmit, handleChange, cancelPath }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="title">
      <Form.Label>Title</Form.Label>
      <Form.Control
        type="text"
        placeholder="Title"
        name="title"
        value={quote.title}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="author">
      <Form.Label>Author</Form.Label>
      <Form.Control
        type="text"
        placeholder="Author"
        name="author"
        value={quote.author}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="date">
      <Form.Label>Date</Form.Label>
      <Form.Control
        type="date"
        name="firstPublished"
        value={quote.firstPublished}
        onChange={handleChange}
      />
    </Form.Group>
    <Button className="mr-2" type="submit">Submit</Button>
    <Link to={cancelPath}>
      <Button>Cancel</Button>
    </Link>
  </Form>
)

export default QuoteForm
