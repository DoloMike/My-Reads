import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query: query })
  }

  clearQuery = () => {
    this.setState({query: ''})
  }

  getQueryResults = (event) => {
    BooksAPI.search(this.state.query, 20).then(books => {
      if (!books.error) {
        this.setState({ books })
      } else {
        this.setState({ books: [] })
      }
    })

    event.preventDefault()
  }

  render() {
    const { query, books } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>

          <form onSubmit={this.getQueryResults}>
            <div className="search-books-input-wrapper">
              <input
                type='text'
                placeholder='Search by title or author'
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
          </form>

        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book =>
              <Book
                key={book.id}
                id={book.id}
                title={book.title}
                authors={book.authors}
                backgroundImage={book.imageLinks ? book.imageLinks.thumbnail : ''}
                updateShelfs={this.props.updateShelfs}
                shelf={book.shelf ? book.shelf : ''}
              />
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
