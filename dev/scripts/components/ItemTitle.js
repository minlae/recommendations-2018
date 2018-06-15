import React from 'react';

class ItemTitle extends React.Component {

	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		console.log("clicked");
	}

	// Something here to check if item is "active"? /If item is clicked change its colour. Then if not clicked, go back to default. How do I do this? Sigh JS...

	render() {
		const title = this.props.details.title;
		return (
		<li onClick={this.handleClick}>
			<h4>{title}</h4>
		</li>
		)
	}
}

export default ItemTitle;