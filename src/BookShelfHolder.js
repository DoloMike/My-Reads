import React from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

const BookShelfHolder = (props) => {
  const { shelves, books, updateShelves, shelfStates } = props

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>

      <div className="list-books-content">
        {Object.keys(shelves).map(shelfKey =>
          <BookShelf
            key={shelfKey}
            shelfTitle={shelves[shelfKey]}
            books={books.filter(book => book.shelf === shelfKey)}
            updateShelves={updateShelves}
            shelfStates={shelfStates}
          />
        )}
      </div>

      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

export default BookShelfHolder
