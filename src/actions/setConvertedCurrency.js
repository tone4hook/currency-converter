import { SET_CONVERTED_CURRENCY } from "./actionTypes";

/**
 * Set converted currency action.
 * @param {num} arg Converted currency.
 */
export function setConvertedCurrency(currency) {
	let convertedCurrency = {};
	if (typeof currency === "string")
		if (
			currency.length === 3 &&
			currency === currency.toUpperCase() &&
			!/[^a-zA-Z]/.test(currency)
		)
			convertedCurrency["code"] = currency;
	return {
		type: SET_CONVERTED_CURRENCY,
		convertedCurrency
	};
}