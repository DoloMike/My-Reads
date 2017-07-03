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

  changeShelf(book, shelf) {
    const booksCopy = this.state.books
    const updatedCopy = booksCopy.map(bk => {
      if(bk.id === book.id) {
        bk.shelf = shelf
      }

      return bk
    })

    BooksAPI.update(book, shelf).then(books => {
      if(books)
        this.setState({books: updatedCopy})
    })
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
                  onShelfChange={(book, shelf) => {
                    this.changeShelf(book, shelf)
                  }}
                />

                <BookShelf
                  books={this.state.books.filter(book => book.shelf === 'wantToRead')}
                  shelfTitle={"Want To Read"}
                  onShelfChange={(book, shelf) => {
                    this.changeShelf(book, shelf)
                  }}
                />

                <BookShelf
                  books={this.state.books.filter(book => book.shelf === 'read')}
                  shelfTitle={"Read"}
                  onShelfChange={(book, shelf) => {
                    this.changeShelf(book, shelf)
                  }}
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
              onShelfChange={(book, shelf) => {
                this.changeShelf(book, shelf)
              }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
