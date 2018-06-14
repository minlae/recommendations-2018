import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

class App extends React.Component {

render() {
	return (
		<div className="main-page">
			<h1>Recommendations</h1>
			<div className="button-container">
				<Link to="/movies">Movies</Link>
				<Link to="/books">Books</Link>
			</div>
		</div>
	)
}
};

export default App;