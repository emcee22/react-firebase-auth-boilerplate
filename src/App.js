import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

// context
import Auth from './core';

// local components
import { LogIn } from './layouts/LogIn/LogIn';
import { Home } from './layouts/Home/Home';
import { Blog } from './layouts/Blog/Blog';
import { Contact } from './layouts/Contact/Contact';
import { ProtectedRoute } from './layouts/ProtectedRoute/ProtectedRoute';

class App extends React.Component {
	render() {
		return (
			<Auth.Provider>
				<BrowserRouter>
					<Switch>
						<Route exact path='/log-in' component={LogIn} />

						<ProtectedRoute
							exact
							path='/app/home'
							component={Home}
						/>
						<ProtectedRoute
							exact
							path='/app/blog'
							component={Blog}
						/>
						<ProtectedRoute
							exact
							path='/app/contact'
							component={Contact}
						/>

						<Route
							component={() => {
								return <Redirect to='/log-in' />;
							}}
						/>
					</Switch>
				</BrowserRouter>
			</Auth.Provider>
		);
	}
}

export default App;
