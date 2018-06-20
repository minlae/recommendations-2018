import React from 'react';
import Header from './header';
import AddItemForm from './AddItemForm';
import MovieCatalogue from './MovieCatalogue';

class Movies extends React.Component {

	constructor() {
		super();
		this.state = {
			priority: true,
			samples: false,
			movies: []
		}
		// this.addItem = this.addItem.bind(this);
	}

	// addItem(movie) {
	// 	alert("Sorry, this page is still under construction. Movies can't be added at this time.")
	// }

	render() {
		return ( <div>
			<Header />
			<h1 className="view-title">Movies</h1>
			<div className="temp-container">
				<p className="temp-description">Welcome to your Movies page! This component of the app is still under construction. Check back later to add your movie recommendations. In the meantime here are some of the most popular movies of 2018! </p>
				<MovieCatalogue />
			</div>
			{/*<div className="items-main-container">
				<div className="forms-container">
					<AddItemForm 
						titlePlaceholder="Movie Title"
						creatorPlaceholder="Director"
						addItem={this.addItem}
						recType="Movie"
						loadMovies={this.state.samples}
						movie={true}
					/>
				</div>
			<div className="itemslist-container">
				<label className="btn-label">Page coming soon text here.</label>
					<ul className="item-list">
						<MovieCatalogue />
					</ul>
				</div>
			</div>*/}
		</div>
		)
	}
}

export default Movies;