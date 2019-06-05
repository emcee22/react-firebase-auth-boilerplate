import React, { Component } from 'react';
import { firebaseAppAuth, providers } from '../firebase';
const AuthContext = React.createContext();

class AuthProvider extends Component {
	mounted = false;
	unsubscribe = null;
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			authenticated: false
		};
	}

	componentDidMount() {
		this.mounted = true;
		this.unsubscribe = firebaseAppAuth.onAuthStateChanged(user => {
			if (this.mounted) {
				if (user) {
					this.setState({
						authenticated: true,
						user
					});
				} else {
					this.setState({
						authenticated: false,
						user: null
					});
				}
			}
		});
	}

	componentWillUnmount() {
		this.mounted = false;
		this.unsubscribe && this.unsubscribe();
	}

	logIn = () => {
		return firebaseAppAuth
			.signInWithPopup(providers.googleProvider)
			.catch(error => {
				throw new Error(
					`We can't sign you in! Reason -> ${
						error.message
					}, Code -> ${error.code}`
				);
			});
	};

	logOut = () => {
		return firebaseAppAuth.signOut().catch(error => {
			throw new Error(
				`We can't end your session!  Reason -> ${
					error.message
				}, Code -> ${error.code}`
			);
		});
	};

	render() {
		return (
			<AuthContext.Provider
				value={{
					...this.state,
					logIn: this.logIn,
					logOut: this.logOut
				}}
			>
				{this.props.children}
			</AuthContext.Provider>
		);
	}
}

export const Consumer = AuthContext.Consumer;
export const Provider = AuthProvider;
