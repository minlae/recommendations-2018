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
		this.setState({ books: sampleBooks });
	}

	// List should spit out ITEM with props "title" the title should be the title of the book.
	// Other prop to check if item is read/seen
	// Item should be ablet to be crossed out. Where would this state go? Like checked? Maybe part of book object. Default is not seen. And then you can check "seen" and then it will be crossed out.
	// So item should be able to check "seen" status. If seen then item should be crossed out.
	// Also if item is selected - e.g. clicked on, should stand out.

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
			<button onClick={this.loadBooks}>Load Sample Books</button>
			<ul>
			{ Object.keys(this.state.books).map( key => (
				<ItemTitle key={key} details={this.state.books[key]} index={key}/>
			))}
			</ul>
			<ul>
				{ Object.keys(this.state.books).map( key => (
					<ItemDetails key={key} details={this.state.books[key]} index={key}/>
				))}
			</ul>
		</div>
		)
	}
}

export default Books;