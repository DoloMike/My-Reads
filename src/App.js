import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
      BooksAPI.getAll().then(books => {
        this.setState({ books })
      })
  }

  updateShelfs = (book, shelf) => {
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
              <div>
                <BookShelf
                  books={this.state.books.filter(book => book.shelf === 'currentlyReading')}
                  shelfTitle={"Currently Reading"}
                  updateShelfs={this.updateShelfs}
                />

                <BookShelf
                  books={this.state.books.filter(book => book.shelf === 'wantToRead')}
                  shelfTitle={"Want To Read"}
                  updateShelfs={this.updateShelfs}
                />

                <BookShelf
                  books={this.state.books.filter(book => book.shelf === 'read')}
                  shelfTitle={"Read"}
                  updateShelfs={this.updateShelfs}
                />
              </div>
            </div>

            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>

        <Route path="/search" render={( {history} ) => (
          <SearchBooks
              books={this.state.books}
              updateShelfs={this.updateShelfs}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
