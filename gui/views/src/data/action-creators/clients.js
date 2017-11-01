import { ADD_CLIENT } from '../../actionTypes';
import store from '../../store';
import randomstring from 'randomstring';

export function addClient(type, ip) {
	let clientId

	do {
		clientId = randomstring.generate();
	} while (store.getState().clients[clientId]);

	let newClient = {
		type: ADD_CLIENT,
		client: {}
	};

	newClient.client[clientId] = { ip, type }

	return newClient;
}

export function setAggregator(type) {
	
}
