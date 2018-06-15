import React from 'react';

class ItemDetails extends React.Component {
	render() {
		// Can't do destructuring because webpack can't transpile ES6 I think
		const title = this.props.details.title;
		const creator = this.props.details.creator;
		const image = this.props.details.image;
		const desc = this.props.details.desc;
		const priority = this.props.details.priority;

		return(
		<li>
			<h3>{title}</h3>
			<h4>{creator}</h4>
			<p>Priority: {priority}</p>
			<img src={image} alt={title} />
			<p>{desc}</p>
		</li>
		)
	}
}

export default ItemDetails;