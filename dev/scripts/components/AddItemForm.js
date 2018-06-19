import React from 'react';
import PropTypes from 'prop-types';

class AddItemForm extends React.Component {
	
	constructor() {
		super();
		
		this.titleRef = React.createRef();
		this.creatorRef = React.createRef();
		this.priorityRef = React.createRef();
		this.addedByRef = React.createRef();
		this.descRef = React.createRef();
		this.imageRef = React.createRef();

		this.addItem = this.addItem.bind(this);
	}

	addItem(event) {
		// 1. stop form from default submitting
		event.preventDefault();

		// taking all the refs from below and putting them into an "item" object
		// console returns "Object" so need to do the object keys thing that wes did and then loop and display them. Maybe. First need to get all this into state!
		const item = {
			title: this.titleRef.current.value,
			creator: this.creatorRef.current.value,
			priority: this.priorityRef.current.value,
			addedBy: this.addedByRef.current.value,
			desc: this.descRef.current.value,
			image: this.imageRef.current.value
		}

		// console.log(item);
		this.props.addItem(item);
		// this.props.getBook(item.title);
		// This is where you would make the axios call with the item.title as the search field (see books and movies)
		event.currentTarget.reset();
	}

	render() {
		return (
		<div>
			<form className="main-form" onSubmit={this.addItem}>
			<legend>Add Book</legend>
				<label htmlFor="title">{this.props.titlePlaceholder}</label>
				<input required name="title" ref={this.titleRef} type="text" placeholder={this.props.titlePlaceholder} />
				<label htmlFor="creator">{this.props.creatorPlaceholder}</label>
				<input name="creator" ref={this.creatorRef} type="text" placeholder={this.props.creatorPlaceholder} /> 
				<label htmlFor="priority">Priority</label>
				<select name="priority" ref={this.priorityRef}>
					<option value="3" >&#9733; &#9733; &#9733;</option>
					<option value="2" >&#9733; &#9733;</option>
					<option value="1" >&#9733;</option>
				</select>
				<label htmlFor="addedBy">Added by</label>
				<input name="addedBy" ref={this.addedByRef} type="text" placeholder="Added by"/>
				<label htmlFor="desc">Description</label>
				<textarea name="desc" ref={this.descRef} placeholder="Desc" />
				<label htmlFor="image">Image</label>
				<input name="image" ref={this.imageRef} type="text" placeholder="Image" />
				<button className="app-btn" type="submit">Add {this.props.recType}</button>
				<button className="app-btn" onClick={this.props.loadBooks}>{this.props.samples ? "Add Sample Books" : "Load Sample Books"}</button>
			</form>
		</div>
		)
	}
}

AddItemForm.propTypes = {
	titlePlaceholder: PropTypes.string,
	creatorPlaceholder: PropTypes.string,
	recType: PropTypes.string,
	samples: PropTypes.bool,
	addItem: PropTypes.func
}

export default AddItemForm;