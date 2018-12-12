import { EXAMPLE_ACTION } from "./actionTypes";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export function exampleAction(sample) {
	return {
		type: EXAMPLE_ACTION,
		sample
	};
}

export function handleInitialData() {
	return dispatch => {
		return new Promise((resolve, reject) => {
			dispatch(showLoading());
			let wait = setTimeout(() => {
				const dateObj = new Date();
				const month = dateObj.getUTCMonth() + 1;
				const day = dateObj.getUTCDate();
				const year = dateObj.getUTCFullYear();
				const date = year + "/" + month + "/" + day;
				const sample = {
					id: day,
					date
				};
				dispatch(exampleAction(sample));
				clearTimeout(wait);
				resolve(dispatch(hideLoading()));
			}, 2000);
		});
	};
}