import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

class App extends React.Component {

// For next draft: Get username here and then use that as the "Added By". Separately from login - so that way person doesn't have to use real name.
// If it's the same as a real name say "Sorry, someoen is already using that name - try another!"
// Could even do a "generate random name" slot :P

render() {
	return (
		<div className="main-page">
			<div className="main-page-container">
				<h1>Recommendations</h1>
				<div className="button-container">
					<Link className="app-btn app-btn-main" to="/books">See Books</Link>
					<Link className="app-btn app-btn-main" to="/movies">See Movies</Link>
				</div>
			</div>
		</div>
	)
}
};

export default App;