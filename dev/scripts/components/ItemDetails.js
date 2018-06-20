import React from 'react';
import PropTypes from 'prop-types';

class ItemDetails extends React.Component {
	
	constructor() {
		super();
		this.state = {
			active: false,
			showDescription: false,
			editing: false
		}
		
		this.isActive = this.isActive.bind(this);
		this.notActive = this.notActive.bind(this);
		this.showDescription = this.showDescription.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	isActive() {
		// console.log(`clicked ${this.props.details.title}`);
		this.setState({ 
			active: true,
			editing: true
		});
	}
	notActive() {
		// console.log(`not active ${this.props.details.title}`);
		this.setState({ 
			active: false,
			// editing: false
		});
	}


	handleChange(event) {
		// const index = this.props.index;
		const updatedBooks = Object.assign({[event.currentTarget.name]: event.currentTarget.value }, this.props.books);
		// console.log(event.currentTarget.name);
		// [event.currentTarget.name]: event.currentTarget.value 
		// console.log(this.props.index);
		this.props.editItem(this.props.index, updatedBooks);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({ editing: false });
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
		const editing = this.state.editing;
		let stars;

		// not sure how to render the stars instead of the number for HTML char. This is the best way I could find for now. Could use someting like Font Awesome for icons.
		if (priority=='3') {
			stars = "★ ★ ★";
			console.log('priority 3')
		}else if (priority=='2') {
			stars = "★ ★";
		}else{
			stars= "★";
		}

		// console.log(this.props.details);

		// Question: The updating is super slow. Why? Is it my environment? 
		
		if (editing) {
			return (
				<li
					className={`item-card ${active?`active`:null} ${seen?`seen-card`:null}`}
					onBlur={this.notActive}
					tabIndex='0'
					>
					<form className="editing-item" onSubmit={this.handleSubmit}>
						<input className="title" name="title" type="text" placeholder={title} value={title}
						onChange={this.handleChange}
						/>
						<input className="creator" name="creator" type="text" placeholder={creator} value={creator} 
						onChange={this.handleChange}
						/> 
						<label htmlFor="priority">Priority</label>
						<select onChange={this.handleChange} name="priority">
							<option value="3" >&#9733; &#9733; &#9733;</option>
							<option value="2" >&#9733; &#9733;</option>
							<option value="1" >&#9733;</option>
						</select>
						{ addedBy?<input name="addedBy" type="text" placeholder="Added by" value={addedBy} onChange={this.handleChange} />: null}
						{image ? <img src={image} alt={title} /> : null }
						<textarea className="desc" name="desc" placeholder="Desc" value={desc} onChange={this.handleChange} />
						<button className="app-btn-filled" type="submit">Submit Changes</button>
					</form>
				</li>
			)
		} else {
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