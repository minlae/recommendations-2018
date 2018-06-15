import React from 'react';

class ItemDetails extends React.Component {
	
	constructor() {
		super();
		this.state = {
			active: false
		}
		
		this.isActive = this.isActive.bind(this);
		this.notActive = this.notActive.bind(this);
	}
	
	isActive() {
		// console.log(`clicked ${this.props.details.title}`);
		this.setState({ active: true });
	}

	notActive() {
		// console.log(`not active ${this.props.details.title}`);
		this.setState({ active: false });
	}

	render() {
		// Can't do destructuring because webpack can't transpile ES6 I think
		const title = this.props.details.title;
		const creator = this.props.details.creator;
		const image = this.props.details.image;
		const desc = this.props.details.desc;
		const priority = this.props.details.priority;
		const seen = this.props.details.seen;
		const active = this.state.active;

		return(
		<li
			onClick={this.isActive}
			className={`item-card ${seen ? `seen-card` : ``} ${active ? `active` : `inactive`}`}
			tabIndex="0"
			onBlur={this.notActive}
			>
			<h3>{title}</h3>
			<h4>{creator}</h4>
			<p>Priority: {priority}</p>
			{image ? <img src={image} alt={title} /> : '' }
			<p>{desc}</p>
		</li>
		)
	}
}

// Note on the active/inactive trick from a Stack Overflow answer: Certain HTML elements can have what is known as "focus", for example input elements. Those elements will also respond to the blur event, when they lose that focus. To give any element the capacity to have focus, just make sure its tabindex attribute is set to anything other than -1. Use tabIndex for React.

export default ItemDetails;