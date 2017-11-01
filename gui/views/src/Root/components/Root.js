import React from 'react';

// Router Creation libraries
import { Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// Components
import Welcome from '../../Welcome/components/Welcome';
import Dashboard from '../../Dashboard/components/Dashboard';

import '../styles/Root.css';

const history = createHistory();

const Root = ({ store }) => (
	<Provider store={ store }>
		<ConnectedRouter history={ history } >
			<Route exact path="/welcome" component={ Welcome }/>
		</ConnectedRouter>
	</Provider>
);

export default Root;
