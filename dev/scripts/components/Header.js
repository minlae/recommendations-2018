import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Movies from './Movies';
import Books from './Books';


// There must be a way to indicate an "active" page and then display the appropriate title.
// There are ways to do it through Router I think.

const Header = props => (
	<header>
		<nav className="header-menu">
			<Link className="nav-link" to="/books">Books</Link>
			<Link className="nav-link" to="/movies">Movies</Link>
			<Link className="nav-link" to="/">Home</Link>
		</nav>
	</header>
);

export default Header;