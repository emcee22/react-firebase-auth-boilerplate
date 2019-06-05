import React from 'react';
import { Link, withRouter } from 'react-router-dom';

// context
import Auth from '../../core';

// local css
import './Header.css';

const Header = props => {
	return (
		<Auth.Consumer>
			{context => {
				return (
					<header className="Header">
						<ul>
							<li>
								<Link to="/app/home">Home</Link>
							</li>
							<li>
								<Link to="/app/blog">Blog</Link>
							</li>
							<li>
								<Link to="/app/contact">Contact</Link>
							</li>
						</ul>
						<div className="Header__user">
							<p>
								Hello <b>{context.user.displayName}</b>
							</p>
							<button
								className="btn btn-secondary"
								onClick={() => {
									context.logOut().then(() => {
										props.history.push('/log-in');
									});
								}}
							>
								LogOut
							</button>
						</div>
					</header>
				);
			}}
		</Auth.Consumer>
	);
};

export default withRouter(Header);
