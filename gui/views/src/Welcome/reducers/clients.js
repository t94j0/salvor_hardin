import { ADD_CLIENT } from '../../actionTypes';

/**
 * [
 * 	{
 * 		type: '',
 * 		client: {
 * 			ip: '',
 * 			type: ''
 * 		}
 * 	},
 * 	{...
 * ]
 **/
const initialState = [];

function client(state = initialState, action) {
	switch(action.type) {
		case ADD_CLIENT:
			return [
				...state,
				action.client
			]
		default:
			return state;
	}
}

export default client;
