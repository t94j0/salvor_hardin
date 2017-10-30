import { createStore, combineReducers } from 'redux';
import clients from './Welcome/reducers/clients';
import triggers from './Dashboard/reducers/triggers';

const store = createStore(
	combineReducers({
		clients,
		triggers
	})
);

export default store;
