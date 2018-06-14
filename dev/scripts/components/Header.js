import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Movies from './Movies';
import Books from './Books';


const Header = props => (
	<header>
		<nav className="header-menu">
			<Link className="nav-link" to="/movies">Movies</Link>
			<Link className="nav-link" to="/books">Books</Link>
			<Link className="nav-link" to="/">Home</Link>
		</nav>
	</header>
);

// class Header extends React.Component {
	
// 	constructor() {
// 		super();
// 		this.state = {
// 			movies: false
// 		}
// 	}

// 	render() {
// 		return (
// 			<div>
// 				{ this.state.movies ? <Link to="/books">Books</Link> : <Link to="/movies">Movies</Link> }
// 			</div>
// 		)
// 	}
// };



export default Header;