import React from 'react';

class SearchBookForm extends React.Component {
	constructor() {
		super();
		
		this.bookSearchRef = React.createRef();

		this.getBook = this.getBook.bind(this);
	}

	getBook(event) {
		event.preventDefault();
		const book = {
			title: this.bookSearchRef.current.value,
		}
		console.log(book.title);
		this.props.searchBook(book.title);
		
		event.currentTarget.reset();
	}

	render() {
		return (
			<div>
				<form className="main-form search-section" onSubmit={this.getBook}>
				<legend>Search Google Books</legend>
					<label htmlFor="search-title">Title</label>
					<input required name="title" ref={this.bookSearchRef} type="text" placeholder="Search Title" />
					<button className="app-btn" type="submit">Search</button>
				</form>
			</div>
		)
	}

}

export default SearchBookForm;