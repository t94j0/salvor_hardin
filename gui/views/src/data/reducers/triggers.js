import { ADD_TRIGGER } from '../../actionTypes';
const randomstring = require('randomstring');

const initialState = { };

function trigger(state = initialState, action) {
	switch (action.type) {
		case ADD_TRIGGER:
			const id = randomstring.generate()
			return Object.assign({}, state, {
				id: id,
				trigger: action.trigger
			});
		default:
			return state;
	}

}

export default trigger;
