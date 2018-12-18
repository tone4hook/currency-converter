import { setConvertedCurrency } from "../setConvertedCurrency";
import { SET_CONVERTED_CURRENCY } from "../actionTypes";

describe("action", () => {
	describe("@return {Object} with property ['type'] and ['convertedCurrency']", () => {
		describe("If @param is not in currency code format", () => {
			const expectedAction = {
				type: SET_CONVERTED_CURRENCY,
				convertedCurrency: {}
			}
			it("should set {Object}['convertedCurrency'] = empty {Object}", () => {
				expect(setConvertedCurrency(123)).toEqual(expectedAction);
			});
			it("should set {Object}['convertedCurrency'] = empty {Object}", () => {
				expect(setConvertedCurrency("123")).toEqual(expectedAction);
			});
			it("should set {Object}['convertedCurrency'] = empty {Object}", () => {
				expect(setConvertedCurrency("usd")).toEqual(expectedAction);
			});
		});
		describe("If @param is in currency code format", () => {
			const expectedAction = {
				type: SET_CONVERTED_CURRENCY,
				convertedCurrency: {
					code: "USD"
				}
			}
			it("should set {Object}['convertedCurrency'] = {Object}['code'] = @param", () => {
				expect(setConvertedCurrency("USD")).toEqual(expectedAction);
			});
		});
	});
});