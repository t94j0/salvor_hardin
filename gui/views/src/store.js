import { createStore, combineReducers } from 'redux';
import clients from './data/reducers/clients';
import triggers from './data/reducers/triggers';

const store = createStore(
	combineReducers({
		clients,
		triggers
	})
);

export default store;
