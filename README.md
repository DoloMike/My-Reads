This is a react app for organizing books. The goal of this app is to keep book worms organized by providing virtual shelves to hold what they want to read, what they are currently reading, and what they have read. There is also a search page for them to look at all the books they haven't yet placed on a shelf.

## Installation
Be sure to have node, npm, and git downloaded to your local machine

* Pull down the repository with a `git clone https://github.com/DoloMike/My-Reads.git`
* Run either `yarn install` or `npm install` to download necessary dependencies.
* Once finished, you can run `yarn start` or `npm start` to start the app!

## Backend Server
This react app uses a backend REST API. See below for details.

### `getAll()`
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update(book, shelf)`
* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search(query, maxResults)`
* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
