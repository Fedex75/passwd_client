import React from 'react';
import { Redirect, Route, withRouter } from 'react-router';
import Auth from '../Auth';

function ProtectedRoute({component: Component, adminOnly: AdminOnly, ...rest}){
	return (
		<Route {...rest} render={props => {
			if (Auth.authenticated){
				if (AdminOnly){
					if (Auth.user.role === 'role_admin') return <Component {...props} />
					return <Redirect to={{ pathname: '/overview' }} />
				} else {
					return <Component {...props} />
				}
			} else {
				return <Redirect to={{ pathname: '/login', state: { redirect: props.location.pathname + props.location.search + props.location.hash, guest: false } }} />
			}  
		}} />
	);
}

export default withRouter(ProtectedRoute);
