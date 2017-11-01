import { ADD_CLIENT } from '../../actionTypes';

/**
 * [
 * 	{
 * 		type: '',
 * 		client: {
	 * 		RANDOMLY_GENERATED_ID: {
	 * 			ip: '',
	 * 			type: ''
	 * 		}
 * 		}
 * 	},
 * 	{...
 * ]
 **/
const initialState = { };

function client(state = initialState, action) {
	switch(action.type) {
		case ADD_CLIENT:
			return Object.assign({}, state, action.client);
		default:
			return state;
	}
}

export default client;
