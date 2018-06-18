import React from 'react';
import axios from 'axios';


class MovieCatalogue extends React.Component {
	constructor() {
		super();
		this.state = {
			movies: []
		}
	}

	componentDidMount() {

		// const movieKey = "b8b83ba71713f763aef645ce0a40da06";
		axios({
			url: `https://api.themoviedb.org/3/discover/movie`,
			params: {
				api_key: `b8b83ba71713f763aef645ce0a40da06`,
				language: `en-US`,
				sort_by: `popularity.desc`,
				include_adult: `false`,
				include_video: `false`,
				page: `1`,
				primary_release_year: `2015`

			}
		}).then((res)=> {
			console.log(res);
			this.setState({
				movies: res.data.results
			});
		});
	}

	render() {
		return (<div className='movie-catalogue'>
		    {this.state.movies.map((movie, i) => {
		        return (
		            <div key={movie.id} className='movie-catalogue__movie'>
		                <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
		            </div>
		        )
		    })}
		</div>)
	}
}

export default MovieCatalogue;