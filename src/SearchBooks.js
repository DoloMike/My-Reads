import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class SearchBooks extends Component {
  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query })
  }

  clearQuery = () => {
    this.setState({query: ''})
  }

  getQueryResults = (query, books) => {
    let showingBooks = [], matchTitles, matchAuths

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      matchTitles = books.filter(book => match.test(book.title))
      matchAuths = books.filter(book => match.test(book.authors))
      showingBooks = Array.from(new Set([...matchTitles, ...matchAuths]))
    } else {
      showingBooks = books
    }

    if (showingBooks.length > 0) {
      showingBooks.sort(sortBy('title'))
    }

    return showingBooks
  }

  render() {
    const { query } = this.state
    const { books } = this.props
    const showingBooks = this.getQueryResults(query, books)

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type='text'
              placeholder='Search by title or author'
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks.map(book =>
              <Book
                key={book.id}
                id={book.id}
                title={book.title}
                authors={book.authors}
                backgroundImage={book.imageLinks.thumbnail}
                onShelfChange={this.props.onShelfChange}
                shelf={book.shelf}
              />
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
