import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// History
import createHistory from 'history/createBrowserHistory';

// Store imports
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import clients from './data/reducers/clients';
import triggers from './data/reducers/triggers';

// Components
import Root from './Root/components/Root';

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
	combineReducers({
		clients,
		triggers,
		router: routerReducer
	}),
	applyMiddleware(middleware)
);

ReactDOM.render(<Root history={ history } store={ store } />, document.getElementById('root'));
registerServiceWorker();
