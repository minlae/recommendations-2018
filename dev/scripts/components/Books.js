import React from 'react';
import Header from './Header';
import sampleBooks from '../sample-books';
import AddItemForm from './AddItemForm';
import ItemTitle from './ItemTitle';
import ItemDetails from './ItemDetails';

class Books extends React.Component {

	constructor() {
		super();
		this.state = {
			samples: false,
			books: {}
		}
		this.addItem = this.addItem.bind(this);
		this.loadBooks = this.loadBooks.bind(this);
	}

	addItem(book) {
		console.log("adding book");
		// I think my dependencies can't handle the newest es/js stuff so this object spread syntax does not work. Have to use Object.assign instead. It creates a copy of the object because you never want to change state directly. "Treat state as immutable".
		// const books = { ...this.state.books };
		// Note in previous version of project, the books were an array in state. And instead of creating an object copy, I created a new array and pushed the objects into it and then set that array as the new state.
		const books = Object.assign({}, this.state.books);
		books[`book${Date.now()}`] = book;
		// the Date.now() gives it a unique number - date in milliseconds
		this.setState({
			books
		});
	}

	loadBooks() {
		// Note: Beware! This will overwrite any books you had in the state previously. But if you add a book one by one through AddItemForm, it will add it to state. It'll be lost if you hit the load sample books again though. Warning below.
		if (this.state.samples) {
			if (confirm('Warning: This will delete all your custom books. Is this ok?')) {
				this.setState({ books: sampleBooks });
			} else {
			    // Do nothing!
			}
		} else {
			this.setState({ samples: true });
			this.setState({ books: sampleBooks });
		}
	}


// Styling: Cards with all info displayed.
// If item is selected, should have a bg colour card (green?)
// If item is marked as seen, shoudl have a different bg colour (gray? or have a big "SEEN" overlay?)

// Make item register that it's been clicked on / selected - done!!!!1
// Make item show it's been seen - done

// Also! Image should only display if there IS an image. Remove the broken image icon

// Button to sort items from highest priority to lowest

	render() {

		return ( <div>
			<Header />
			<h1>Books</h1>
			<AddItemForm 
				titlePlaceholder="Book Title" 
				creatorPlaceholder="Author"
				addItem={this.addItem} 
				recType="Book" 
			/>
			<button onClick={this.loadBooks}>{this.state.samples ? "Reset Sample Books" : "Load Sample Books"}</button>
			<ul>
				{ Object.keys(this.state.books).map( key => (
					<ItemDetails
						key={key}
						details={this.state.books[key]}
						index={key}
					/>
				))}
			</ul>
		</div>
		)
	}
}

export default Books;