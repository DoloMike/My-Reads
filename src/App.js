import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

const unshelvedState = {none: "None"}
const shelves = { currentlyReading: 'Currently Reading', wantToRead: 'Want to Read', read: 'Read' }
const shelfStates = Object.assign({}, shelves, unshelvedState)

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
      BooksAPI.getAll().then(books => {
        if(books)
          this.setState({ books })
      })
  }

  updateShelves = (book, shelf) => {
    let addedBook = true
    const updatedBooks = this.state.books.map(b => {
      if(b.id === book.id) {
        b.shelf = shelf
        addedBook = false
      }

      return b
    })

    if(addedBook) {
      BooksAPI.get(book.id).then(resBook => {
        updatedBooks.push(resBook)
        this.setState({ books: updatedBooks })
      })
    } else {
      this.setState({ books: updatedBooks })
    }
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              {Object.keys(shelves).map(shelfKey =>
                <BookShelf
                  key={shelfKey}
                  shelfTitle={shelves[shelfKey]}
                  books={this.state.books.filter(book => book.shelf === shelfKey)}
                  updateShelves={this.updateShelves}
                  shelfStates={shelfStates}
                />
              )}
            </div>

            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>

        <Route path="/search" render={( {history} ) => (
          <SearchBooks
              shelvedBooks={this.state.books}
              updateShelves={this.updateShelves}
              shelfStates={shelfStates}
              unshelvedState={Object.keys(unshelvedState)[0]}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
