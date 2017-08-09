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

  handleShelfChange = (event, child, book) => {
    const shelf = child.props.value
    BooksAPI.update(book, shelf).then(books => {
      if(books && !books.error) {
        this.props.updateShelves(book, shelf)
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
                  value={this.props.shelf}
                  onItemTouchTap={(event, child) => this.handleShelfChange(event, child, book)}
                  >
                    <MenuItem value="" disabled primaryText="Move to..." />
                    {Object.keys(this.props.shelfStates).map(shelfStateKey =>
                      <MenuItem value={shelfStateKey} primaryText={this.props.shelfStates[shelfStateKey]} key={shelfStateKey}/>
                    )}
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
