import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Auth from '../../core';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
	const loggedIn = props => {
		return (
			<>
				<Header />
				<div className='container'>
					<Component {...props} />
				</div>
			</>
		);
	};

	const loggedOut = props => {
		return (
			<Redirect
				to={{
					pathName: '/',
					state: {
						from: props.location
					}
				}}
			/>
		);
	};

	return (
		<Auth.Consumer>
			{context => {
				return (
					<Route
						{...rest}
						render={props => {
							if (context.authenticated) {
								return loggedIn(props);
							} else {
								return loggedOut(props);
							}
						}}
					/>
				);
			}}
		</Auth.Consumer>
	);
};
