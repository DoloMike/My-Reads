import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ArrowDropIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';

const styles = {
  dropDownStyle: {
    borderRadius: '50%',
    background: '#60ac5d',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  }
}

class Book extends Component {
  state = {
    value: this.props.shelf
  }

  handleShelfChange = (event, child, book) => {
    let shelf = child.props.value

    BooksAPI.update(book, shelf).then(books => {
      if(books) {
        this.props.updateShelfs(book, shelf)
      }
    })
  }

  render() {
    const book = this.props

    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.backgroundImage})` }}></div>
              <div className="book-shelf-changer">
                <IconMenu
                  style={styles.dropDownStyle}
                  iconButtonElement={<IconButton><ArrowDropIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  defaultValue={book.shelf}
                  value={this.state.value}
                  onItemTouchTap={(event, child) => this.handleShelfChange(event, child, book)}
                  >
                    <MenuItem value="" disabled primaryText="Move to..." />
                    <MenuItem value="currentlyReading" primaryText="Currently Reading" />
                    <MenuItem value="wantToRead" primaryText="Want to Read" />
                    <MenuItem value="read" primaryText="Read" />
                    <MenuItem value="none" primaryText="None" />
                </IconMenu>
              </div>
            </div>

            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
          </div>
        </li>
      )
    }
  }

  export default Book
