import React from 'react';
import PropTypes from 'prop-types';

class ItemDetails extends React.Component {
	
	constructor() {
		super();
		this.state = {
			active: false,
			showDescription: false
		}
		
		this.isActive = this.isActive.bind(this);
		this.notActive = this.notActive.bind(this);
		this.showDescription = this.showDescription.bind(this);
	}
	
	isActive() {
		// console.log(`clicked ${this.props.details.title}`);
		this.setState({ active: true });
	}

	notActive() {
		// console.log(`not active ${this.props.details.title}`);
		this.setState({ active: false });
	}

	showDescription() {
		let toggle = !this.state.showDescription;
		this.setState({
			showDescription: toggle
		})
		console.log(!this.state.showDescription);
	}

	render() {
		// Can't do destructuring because webpack can't transpile ES6 I think
		const title = this.props.details.title;
		const creator = this.props.details.creator;
		const image = this.props.details.image;
		const desc = this.props.details.desc;
		const priority = this.props.details.priority;
		const addedBy = this.props.details.addedBy;
		const seen = this.props.details.seen;
		const active = this.state.active;
		const showDescription = this.state.showDescription;
		let stars;

		// not sure how to render the stars instead of the number for HTML char...

		// console.log(priority)
		
		if (priority=='3') {
			stars = "★ ★ ★";
			console.log('priority 3')
		}else if (priority=='2') {
			stars = "★ ★";
		}else{
			stars= "★";
		}

		// console.log(this.props.details);

		return(
		<li
			onClick={this.isActive}
			className={`item-card ${active?`active`:null} ${seen?`seen-card`:null}`}
			tabIndex='0'
			onBlur={this.notActive}
			>
			<h3>{title}</h3>
			<h4>{creator}</h4>
			<p>Priority: { stars } </p>
			{ addedBy?<p>Added by {addedBy}</p> : null}
			{image ? <img src={image} alt={title} /> : null }
			<p className={`item-description ${showDescription?`show`:null}`}>{desc}</p>
			<div className="btn-container">
				<button onClick={this.showDescription} className="app-btn-filled toggle">Toggle Description</button>
				<button onClick={()=>this.props.removeItem(this.props.index)} className="app-btn-filled remove">Remove &#10008;</button>
			</div>
		</li>
		)
	}
}

ItemDetails.propTypes = {
	details: PropTypes.shape({
		title: PropTypes.string,
		creator: PropTypes.string,
		image: PropTypes.string,
		desc: PropTypes.string,
		priority: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
			]),
		addedBy: PropTypes.string,
		seen: PropTypes.bool
	}),
	removeItem: PropTypes.func
}

// Note on the active/inactive trick from a Stack Overflow answer: Certain HTML elements can have what is known as "focus", for example input elements. Those elements will also respond to the blur event, when they lose that focus. To give any element the capacity to have focus, just make sure its tabindex attribute is set to anything other than -1. Use tabIndex for React.

export default ItemDetails;