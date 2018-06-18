import React from 'react';
import Header from './Header';
import sampleBooks from '../sample-books';
import AddItemForm from './AddItemForm';
import ItemTitle from './ItemTitle';
import ItemDetails from './ItemDetails';
import { compareValues, removeDuplicates } from '../helper-functions';
import base from '../base';

// For now:
// Add functionality that the previous version had
// Compile list of changes
// Maybe send to Evan and ask for his advice - but also on what else I could work on - obviously this is very beginner. Didn't even get to Redux yet! Can mention that I'm reading it now. Any excersize I could do (but first check to see if there already is an excersize to do)
// ALSO! Need an edit/update item option!

class Books extends React.Component {

	constructor() {
		super();
		this.state = {
			priority: true,
			samples: false,
			books: {}
		}
		this.addItem = this.addItem.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.loadBooks = this.loadBooks.bind(this);
		this.sortPriority = this.sortPriority.bind(this);
		this.sortAlpha = this.sortAlpha.bind(this);

		this.ref = base.syncState(`book-recommendations`, {
			context: this,
			state: 'books'
		});
	}

	componentDidMount() {
		// Immidately have the books sorted by alphabetical order, in case there are any books in the state (for when there will be once we get data from Firebase)
		// this.sortAlpha(); 
		console.log('mounted');

	}

	componentDidUpdate() {
		// Now also alphabetize books once they're updated
		// Tricky: Without a proper conditional function, calling functions here causes an infinite loop. (From React docs) Why? Why is it creating an infinite loop? 
		
		// () => this.sortAlpha();
	}

	addItem(book) {
		console.log("adding book");
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

	removeItem(key) {
		console.log("removing book");

		const books = Object.assign({}, this.state.books);
		books[key] = null;
		this.setState({ books });
	}

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
		
		this.state.priority ? this.setState({ priority: false }) : '';

		console.log( sortedBooks );
		this.setState({ books: sortedBooks });			
	}


// Styling: Cards with all info displayed.
// If item is selected, should have a bg colour card (green?)
// If item is marked as seen, shoudl have a different bg colour (gray? or have a big "SEEN" overlay?)

// Make item register that it's been clicked on / selected - done!!!!1
// Make item show it's been seen - done

// Also! Image should only display if there IS an image. Remove the broken image icon - done
// But may want to change in future so that if img is broken url also doesn't display.

// Button to sort items from highest priority to lowest - DONE
// By default items should be sorted alphabetically

// maybe sort it first, then pass that info down to the ItemDetails
// Or write a function for sorting. THEN call that function first / immeidately so that state is sorted. (maybe use a react lifecycle event) So it'll automatically be done everytime.

	render() {

		return ( <div>
			<Header />
			<h1 className="view-title">Books</h1>
			<div className="items-main-container">
				<AddItemForm 
					titlePlaceholder="Book Title" 
					creatorPlaceholder="Author"
					loadBooks={this.loadBooks}
					addItem={this.addItem} 
					recType="Book" 
				/>
				<div className="itemlist-container">
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
		</div>
		)
	}
}

export default Books;