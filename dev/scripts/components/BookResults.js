import React from 'react';

class BookResults extends React.Component {
	constructor() {
		super();
		this.state = {
			active: false
		}
		
		this.isActive = this.isActive.bind(this);
		this.notActive = this.notActive.bind(this);
	}


	isActive() {
		this.setState({ active: true });
	}

	notActive() {
		this.setState({ active: false });
	}

	render() {
		const title = this.props.results.volumeInfo.title;
		const author = this.props.results.volumeInfo.authors[0];
		const image = this.props.results.volumeInfo.imageLinks;
		// the imageLinks is sometimes undefined and can break the app so have to check if imageLinks is undefined first before we use the URL for smallThumbnail.

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
			</li>
		)
	}
}

export default BookResults;