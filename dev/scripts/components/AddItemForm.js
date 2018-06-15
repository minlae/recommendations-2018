import React from 'react';

class AddItemForm extends React.Component {
	
	constructor() {
		super();
		this.titleRef = React.createRef();
		this.creatorRef = React.createRef();
		this.priorityRef = React.createRef();
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
			titleRef: this.titleRef.current.value,
			creatorRef: this.creatorRef.current.value,
			priorityRef: this.priorityRef.current.value,
			descRef: this.descRef.current.value,
			imageRef: this.imageRef.current.value
		}

		console.log(item);
		this.props.addItem(item);
		event.currentTarget.reset();
	}

	render() {
		return (
		<div>
			<form className="submit" onSubmit={this.addItem}>
				<input name="title" ref={this.titleRef} type="text" placeholder={this.props.titlePlaceholder} />
				<input name="creator" ref={this.creatorRef} type="text" placeholder={this.props.creatorPlaceholder} /> 
				<select name="priority" ref={this.priorityRef}>
					<option value="3" >&#9733; &#9733; &#9733;</option>
					<option value="2" >&#9733; &#9733;</option>
					<option value="1" >&#9733;</option>
				</select>
				<textarea name="desc" ref={this.descRef} placeholder="Desc" />
				<input name="image" ref={this.imageRef} type="text" placeholder="Image" />
				<button type="submit">Add {this.props.recType}</button>
			</form>
		</div>
		)
	}
}

export default AddItemForm;