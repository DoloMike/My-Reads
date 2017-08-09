import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

const formStyle = {
  width: '100%'
}

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

  resolveBooks(books) {
    // Check shelved books to get shelf state for any book results that are already shelved.
    const resBooks = books.map(b => {
        const bookFound = this.props.shelvedBooks.find(shelvedBook => shelvedBook.id === b.id )

        if(bookFound) {
          return bookFound
        } else {
          b.shelf = this.props.unshelvedState
          return b
        }
    })

    return resBooks
  }

  getQueryResults = (event) => {
    // BooksAPI.search gives matching books without a shelf property.
    BooksAPI.search(this.state.query, 20).then(books => {
      if (books && !books.error) {
        books = this.resolveBooks(books)
        this.setState({ books })
      } else {
        this.setState({ books: [] })
      }
    })

    event.preventDefault()
  }

  updateShelves = (book, shelf) => {
    let bookFound = this.state.books.find(b => b.id === book.id )
    bookFound.shelf = shelf

    const books = this.state.books.map(b => {
      if (b.id === bookFound.id) {
        return bookFound
      } else {
        return b
      }
    })

    this.setState({ books })
    this.props.updateShelves(book, shelf)
  }

  render() {
    const { query, books } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>

          <form style={formStyle} onSubmit={this.getQueryResults}>
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
                updateShelves={this.updateShelves}
                shelf={book.shelf ? book.shelf : ''}
                shelfStates={this.props.shelfStates}
              />
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
