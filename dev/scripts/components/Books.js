import React from 'react';
import Header from './Header';
import AddItemForm from './AddItemForm';

class Books extends React.Component {

	constructor() {
		super();
		this.state = {
			books: {}
		}
		this.addItem = this.addItem.bind(this);
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

	render() {
		return ( <div>
			<Header />
			<h1>Books</h1>
			<AddItemForm placeholder="Book Title" addItem={this.addItem} recType="Book" />
		</div>
		)
	}
}

export default Books;