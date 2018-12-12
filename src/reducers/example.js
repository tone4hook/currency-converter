import { EXAMPLE_ACTION } from "../actions/actionTypes";

export default function example(state = {}, action) {
	switch (action.type) {
		case EXAMPLE_ACTION:
			return {
				...state,
				...action.sample
			};
		default:
			return state;
	}
}