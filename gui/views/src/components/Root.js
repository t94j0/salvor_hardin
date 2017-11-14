import React, { Component } from 'react';

// Router Creation libraries
import { Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

// Components
import AddClient from './AddClient';

const Root = (props) => (
	<Provider store={ props.store }>
		<ConnectedRouter history={ props.history }>
			<div>
				<Redirect exact from="/" to="/welcome" />
				<Route exact path="/welcome" component={ AddClient }/>
			</div>
		</ConnectedRouter>
	</Provider>
)

export default Root;
