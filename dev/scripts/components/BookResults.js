import React from 'react';
import PropTypes from 'prop-types';
// In future: can do autocomplete: https://github.com/JedWatson/react-select


class BookResults extends React.Component {
	constructor() {
		super();
		this.state = {
			active: false
		}
		
		this.isActive = this.isActive.bind(this);
		this.notActive = this.notActive.bind(this);
		this.addResult = this.addResult.bind(this);
	}


	isActive() {
		this.setState({ active: true });
	}

	notActive() {
		this.setState({ active: false });
	}

	addResult(title, auth, img, desc ) {
		console.log(`${title} ${auth} ${img} ${desc}`);
		
		const result = {
			title: title,
			creator: auth,
			priority: '3',
			addedBy: '',
			desc: desc,
			image: img
		}

		// console.log(result);

		this.props.addItem(result);
		// And then clear the search state. 
		// Q: is this the correct place to call this? Need brush up on JS order -- could it ever possibly try to call resetSearch before addItem?
		this.props.resetSearch();

	}

	// pass the values for title author image into an object and then submit that to the books state.
	// So.. just like AddItem

	render() {
		const title = this.props.results.volumeInfo.title;
		const author = this.props.results.volumeInfo.authors[0];
		const image = this.props.results.volumeInfo.imageLinks;
		const desc = this.props.results.volumeInfo.description;
		// the imageLinks is sometimes undefined and can break the app so have to check if imageLinks is undefined first before we use the URL for smallThumbnail.
		// add the other fields as well - not to render but to pass them as function arguments
		// Now will have to make priority and "added by" editable! So that they can add it afterward. Or can put it in here as a form.

		return (
			<li 
				onClick={this.isActive}
				className={`item-card ${this.state.active?`active`:null}`}
				tabIndex='0'
				onBlur={this.notActive}
				>
				<h3>{title}</h3>
				<h4>{author}</h4>
				{(image === undefined) ? null : <img src={image.smallThumbnail} alt={title} /> }
				<button onClick={() => this.addResult(title, author, image.smallThumbnail, desc)} className="app-btn-filled">Add To Books</button>
			</li>
		)
	}
}

BookResults.propTypes = {
	results: PropTypes.shape({
		volumeInfo: PropTypes.shape({
			title: PropTypes.string,
			authors: PropTypes.string,
			imageLinks: PropTypes.string,
			desc: PropTypes.string
		})
	}),
	addItem: PropTypes.func
}


export default BookResults;