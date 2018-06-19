import React from 'react';
import Header from './Header';
import sampleBooks from '../sample-books';
import AddItemForm from './AddItemForm';
import ItemTitle from './ItemTitle';
import ItemDetails from './ItemDetails';
import { compareValues, removeDuplicates } from '../helper-functions';
import base from '../base';
import axios from 'axios';
import BookResults from './BookResults';
import SearchBookForm from './SearchBookForm';

// For now:
// Add functionality that the previous version had
// Compile list of changes
// Maybe send to Evan and ask for his advice - but also on what else I could work on - obviously this is very beginner. Didn't even get to Redux yet! Can mention that I'm reading it now. Any excersize I could do (but first check to see if there already is an excersize to do)
// ALSO! Need an edit/update item option!
// Also a SEEN button and a "who added it" button for future - but maybe once auth is done etc.

class Books extends React.Component {

	constructor() {
		super();
		this.state = {
			priority: true,
			samples: false,
			searchResults: [],
			books: {}
		}
		this.addItem = this.addItem.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.loadBooks = this.loadBooks.bind(this);
		this.sortPriority = this.sortPriority.bind(this);
		this.sortAlpha = this.sortAlpha.bind(this);
		this.searchBook = this.searchBook.bind(this);
		this.resetSearch = this.resetSearch.bind(this);

		// Syncing state to Firebase:
		this.ref = base.syncState(`book-recommendations`, {
			context: this,
			state: 'books'
		});
	}


	addItem(book) {
		// console.log("adding book");
		// I think my dependencies can't handle the newest es/js stuff so this object spread syntax does not work. Have to use Object.assign instead. It creates a copy of the object because you never want to change state directly. "Treat state as immutable".
		// const books = { ...this.state.books };
		// Note in previous version of project, the books were an array in state. And instead of creating an object copy, I created a new array and pushed the objects into it and then set that array as the new state.
		const books = Object.assign({}, this.state.books);
		books[`book${Date.now()}`] = book;
		// the Date.now() gives it a unique number - date in milliseconds
		// removeDuplicates(books);

		this.setState({
			books
		});
	}

	resetSearch() {
		this.setState({
			searchResults: []
		});
	}

	removeItem(key) {
		// console.log("removing book");

		const books = Object.assign({}, this.state.books);
		books[key] = null;
		this.setState({ books });
	}

	//Q: Does this need to be inside componentDidMount?
	searchBook(bookTitle) {
		// const movieKey = "b8b83ba71713f763aef645ce0a40da06";
		// const bookKey = "AIzaSyCzmy3LAli_4J8VGAHaAfdkCL3xC_4iVlE";
		// tried adding a second parameter for bookAuthor and then specificying ${bookAuthor} inauthor in the query below but it doesn't give the right results, especially if you leave it blank!
		axios({
			method: `get`,
			url: `https://www.googleapis.com/books/v1/volumes`,
			params: {
				api_key: `AIzaSyCzmy3LAli_4J8VGAHaAfdkCL3xC_4iVlE`,
				q: `${bookTitle} intitle`,
				langRestrict: `en`,
				maxResults: 6,
				printType: `books`
			}
		}).then((res)=> {
			console.log(res);
			console.log(res.data.items);
			// does this need to be a temporary state? or something of the sort? Yah just set state to: [] when user selects a search result. 
			let searchResults = res.data.items;
			this.setState({
				searchResults
			});
		}).catch((error) => {
			console.log(error);
			// not sure if this is working. Doesn't seem to be... Also if I want to do both author and book title search - maybe need multiple promises? Read up on that Pokemon stuff just to understand the concept
		});
	};

	loadBooks() {
		// Note: Beware! Before Firebase - This will overwrite any books you had in the state previously. But if you add a book one by one through AddItemForm, it will add it to state. It'll be lost if you hit the load sample books again though. Warning below.

		// Maybe new version should be an actual reset? Or somehow prevent duplicates? Hmm logic to prevent duplicates would be nice. A good QUESTION?
		if (this.state.samples) {
			if (confirm('This may duplicate books. Is this ok? ')) {
				// removeDuplicates(sampleBooks);
				this.setState({ books: sampleBooks });
			} else {
			    // Do nothing!
			}
		} else {
			this.setState({ samples: true });
			// removeDuplicates(sampleBooks);
			this.setState({ books: sampleBooks });
		}
	}

	sortAlpha() {
		const books = Object.assign({}, this.state.books);
		const bookArray = Object.keys(books).map( key => (
			books[key]
		));		
		const sortedBooks = bookArray.sort(compareValues('title', 'desc'));
		console.log(sortedBooks)
		this.setState({ books: sortedBooks });		
	}

	sortPriority(order='asc') {
		const books = Object.assign({}, this.state.books);
		
		// below gives us an array of objects
		const bookArray = Object.keys(books).map( key => (
			books[key]
		));
		
		const sortedBooks = bookArray.sort(compareValues('priority', order));
		
		this.state.priority ? this.setState({ priority: false }) : null;

		console.log( sortedBooks );
		this.setState({ books: sortedBooks });			
	}
	

	// Also add a Sort "most recent" using index and "items uploaded by USER"
	// But first - check to see if I can somehow make it work with the network calls.


// If item is marked as seen, shoudl have a different bg colour (gray? or have a big "SEEN" overlay?)
// Make item show it's been seen - done

// But may want to change in future so that if img is broken url also doesn't display.


	render() {
		return ( <div>
			<Header />
			<h1 className="view-title">Books</h1>
			<div className="items-main-container">
				<div className="forms-container">
					<SearchBookForm
						searchBook={this.searchBook}
					/>
					<AddItemForm 
						titlePlaceholder="Book Title" 
						creatorPlaceholder="Author"
						loadBooks={this.loadBooks}
						addItem={this.addItem} 
						recType="Book"
					/>
				</div>
				<div className="itemlist-container">
					{ (this.state.searchResults && this.state.searchResults.length > 0) ? 
						<div>
							<h3>Choose a book:</h3>
							<ul className="item-list">
							{ this.state.searchResults.map( book => (
								<BookResults 
									results={book}
									key={book.id}
									addItem={this.addItem}
									resetSearch={this.resetSearch}
								/> 
								))}
							</ul>
							<button>Use my own book</button>
						</div>
						: null}
					<label className="btn-label">Sort Options</label>
					<div className="sort-buttons-container">
						{this.state.priority ? 
							<button className="app-btn" onClick={() => this.sortPriority('asc')}>High Priority</button> :
							<button className="app-btn" onClick={() => this.sortPriority('desc')}>Low Priority</button>
						}
						<button className="app-btn" onClick={() => this.sortAlpha()}>Alpha</button>
					</div>
					<ul className="item-list">
						{ Object.keys(this.state.books).map( key => (
							<ItemDetails
								key={key}
								details={this.state.books[key]}
								index={key}
								removeItem={this.removeItem}
							/>
						))}
					</ul>
				</div>
			</div>
		</div>)
	}
}

export default Books;