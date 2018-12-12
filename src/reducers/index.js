import { combineReducers } from "redux";
import example from "./example";
import { loadingBarReducer } from "react-redux-loading-bar";

export default combineReducers({
	example,
	loadingBar: loadingBarReducer
});