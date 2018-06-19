import React from 'react';
import Header from './header';
import AddItemForm from './AddItemForm';
import MovieCatalogue from './MovieCatalogue';

// doing movies as an array instead in order to see if there's a difference.

class Movies extends React.Component {

	constructor() {
		super();
		this.state = {
			priority: true,
			sample: false,
			movies: []
		}
		this.addItem = this.addItem.bind(this);
	}

	// How about a PAGE COMING SOON. In the meantime, check out these recs from most popular movies!

	addItem(movie) {
		console.log("adding movie");
		// I think my dependencies can't handle the newest es/js stuff so this object spread syntax does not work. Have to use Object.assign instead. It creates a copy of the object because you never want to change state directly. "Treat state as immutable".
		// const books = { ...this.state.books };
		// Note in previous version of project, the books were an array in state. And instead of creating an object copy, I created a new array and pushed the objects into it and then set that array as the new state.
		const movies = Object.assign({}, this.state.movies);
		movies[`movie${Date.now()}`] = movie;
		// the Date.now() gives it a unique number - date in milliseconds
		this.setState({
			movies
		});
	}



	render() {
		return ( <div>
			<Header />
			<h1>Movies</h1>
			<AddItemForm 
				titlePlaceholder="Movie Title"
				creatorPlaceholder="Director"
				addItem={this.addItem}
				recType="Movie" 
			/>
			<MovieCatalogue />
		</div>
		)
	}
}

export default Movies;