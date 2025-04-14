// LAB 11 - FEATURED TASKS
// In the `BestBooks` component, make a `GET` request to your server `/books` route, in the `componentDidMount` function.
// Store the book data returned from the server in the application `state`.
// Use conditional logic to only render the books when there are more than 0 books stored in the application state.
// When the server does return some books, use a Bootstrap carousel to render all the books returned.
// When the server returns no books, then render a message that the book collection is empty.

import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import bookImg from './book.jpeg';
import ErrorAlert from './ErrorAlert';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      errorMessage: ''
    };
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  componentDidMount = async () => {
    try {
      const config = {
        method: 'get',
        baseURL: import.meta.env.VITE_SERVER_URL,
        url: '/books'
      };

      const response = await axios(config);
      this.setState({
        books: response.data,
        errorMessage: ''
      });

    } catch (error) {
      console.error('Error in BestBooks componentDidMount: ', error);
      this.setState({
        // axios sends more info about the error in a response object on the error
        errorMessage: `Status Code ${error.response.status}: ${error.response.data}`
      });
    }
  };

  closeError = () => {
    this.setState({errorMessage: ''});
  };

  render() {
    /* TODO: render all the books in a Carousel */
    return (
      <>
        <h2 className='text-center'>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <Container>
          {this.state.books.length ? (
            <Carousel id="carousel">
              {this.state.books.map(book => (
                <Carousel.Item key={book._id}>
                  <Image
                    className="w-100"
                    id="carousel-image"
                    src={bookImg}
                    alt={book.name}
                  />
                  <Carousel.Caption id="carousel-text-box">
                    <h2 className="carousel-text">{book.title}</h2>
                    <p className="carousel-text">{book.description}</p>
                    <p className="carousel-text">Status: {book.status}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : this.state.errorMessage.length ?
            <ErrorAlert closeError={this.closeError} errorMessage={this.state.errorMessage} />
            // only render this if there are no books saved in the DB
            : <h3 className="text-center" >No Books Found :(</h3>
          }
        </Container>
      </>
    );
  }
}

export default BestBooks;
