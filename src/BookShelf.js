import React from 'react'
import Book from './Book'
import sortBy from 'sort-by'

const BookShelf = (props) => {
  const { books, shelfTitle, updateShelves, shelfStates } = props

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
