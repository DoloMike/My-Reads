import React from 'react'
import Book from './Book'
import sortBy from 'lodash/sortBy'

const BookShelf = (props) => {
  const { books, shelfTitle, updateShelves, shelfStates } = props
  const sortedBooks = books.length > 0 ? sortBy(books, 'title') : []

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {sortedBooks.map(book =>
            <Book
              key={book.id}
              id={book.id}
              title={book.title}
              authors={book.authors}
              backgroundImage={book.imageLinks? book.imageLinks.thumbnail : ''}
              updateShelves={updateShelves}
              shelf={book.shelf}
              shelfStates={shelfStates}
            />
          )}
        </ol>
      </div>
    </div>
  )
}

export default BookShelf
