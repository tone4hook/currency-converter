import React from "react";
import { App } from "../App";
import { shallow } from "enzyme";

function createTestProps(props) {
	return {
		// common props
		handleSetBaseCurrency: jest.fn(),
		// allow to override common props
		...props
	};
}

describe("rendering", () => {
	beforeEach(() => {

	});
	describe("initial state", () => {
		it("should have default baseCurrency state {string} USD", () => {

		});
		it("should have default convertedCurrency state {string} JPY", () => {});
	});
});
