import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import keyIndex from 'react-key-index';
import BookShelfHolder from './BookShelfHolder'
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
        if(books && !books.error) {
          books = keyIndex(books, 1)
          this.setState({ books })
        } else {
          this.setState({ books: [] })
        }
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
          <BookShelfHolder
            shelves={shelves}
            books={this.state.books}
            updateShelves={this.updateShelves}
            shelfStates={shelfStates}
          />
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
