import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import SvgIcon from 'material-ui/SvgIcon';

class Book extends Component {
  state = {
    value: this.props.shelf
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    const book = this.props

    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.backgroundImage})` }}></div>
            {/* <SvgIcon width="18" height="18" viewBox="0 0 18 18"><path d="M5 8l4 4 4-4z"/></SvgIcon> */}
            <div className="book-shelf-changer">
              <select defaultValue={book.shelf} onChange={(event) => book.onShelfChange(book, event.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>

              {/* <SelectField
                defaultValue={book.shelf}
                value={this.state.value}
                onChange={(event) => book.onShelfChange(book, event.target.value)}
              >
                <MenuItem value="" disabled primaryText="Move to..." />
                <MenuItem value="currentlyReading" primaryText="Currently Reading" />
                <MenuItem value="wantToRead" primaryText="Want to Read" />
                <MenuItem value="read" primaryText="Read" />
                <MenuItem value="none" primaryText="None" />
              </SelectField> */}
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
