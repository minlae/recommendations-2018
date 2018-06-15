import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import App from './App';
import Movies from './Movies';
import Books from './Books';
import Header from './Header';

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Books} />
			<Route exact path="/movies" component={Movies} />
			<Route exact path="/books" component={Books} />
			<Route component= {App} />
		</Switch>
	</BrowserRouter>
);

export default Router;