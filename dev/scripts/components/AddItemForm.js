import React from 'react';

class AddItemForm extends React.Component {
	
	constructor() {
		super();
		this.nameRef = React.createRef();
		this.priceRef = React.createRef();
		this.ratingRef = React.createRef();
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
			nameRef: this.nameRef.current.value,
			ratingRef: this.ratingRef.current.value,
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
				<input name="name" ref={this.nameRef} type="text" placeholder={this.props.placeholder} />
				<select name="rating" ref={this.ratingRef}>
					<option value="5" >&#9733; &#9733; &#9733; &#9733; &#9733;</option>
					<option value="4" >&#9733; &#9733; &#9733; &#9733;</option>
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