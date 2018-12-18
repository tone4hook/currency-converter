import { combineReducers } from "redux";
import date from "./date";
import baseCurrency from "./baseCurrency";
import rates from "./rates";
import errorMessage from "./errorMessage";

import { loadingBarReducer } from "react-redux-loading-bar";

export default combineReducers({
	date,
	baseCurrency,
	rates,
	errorMessage,
	loadingBar: loadingBarReducer
});