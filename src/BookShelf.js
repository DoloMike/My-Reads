import React, { Component } from 'react'
import Book from './Book'
import sortBy from 'sort-by'

class BookShelf extends Component {
  render() {
    const { books, shelfTitle } = this.props

    if (books.length > 0)
      books.sort(sortBy('title'))

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book =>
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

export default BookShelf
