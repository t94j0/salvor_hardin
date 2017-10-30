import { client } from '../reducers/clients';
import { ADD_CLIENT } from '../../actionTypes';
import store from '../../store';
import randomstring from 'ranomstring';

function addClient(ip, type) {
	let id

	do {
		id = randomstring.generate();
	} while (store.getStore().clients.contains(id));

	let newClient = {
		type: ADD_CLIENT,
		id: id,
		client: {
			ip: this.state.ip,
			type: this.state.type
		}
	};
	return newClient;
}

export default addClient;
