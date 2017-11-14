import createHistory from 'history/createBrowserHistory';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

// Reducers
import clients from './data/reducers/clients';
import triggers from './data/reducers/triggers';

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

export { history, store };
