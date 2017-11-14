import { ADD_CLIENT } from '../../actionTypes';
import { store } from '../../storeHistory';
import randomstring from 'randomstring';
import { ipcRenderer } from 'electron';

function addClient(type, ip) {
	switch (type) {
		case 'elasticsearch':
			ipcRenderer.send('fuck this');
			return {
				type: ADD_CLIENT,
				ip,
				type
			};
		case 'splunk':
			return null
		default:
			return null;
	}
}

export { addClient };
