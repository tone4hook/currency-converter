import React from "react";
import { App } from "../App";
import { shallow } from "enzyme";

function createTestProps(props) {
	return {
		isLoaded: 0,
		date: "Mon Dec 17 2018",
		// dispatch action handlers
		handleSetBaseCurrency: jest.fn(),
		handleGetCurrencyData: jest.fn(),
		handleSetErrorMessage: jest.fn(),
		// allow to override common props
		...props
	};
}

describe("rendering", () => {
	let wrapper;
	const createWrapper = props => shallow(<App {...props} />)
	beforeEach(() => {
		const props = createTestProps();
		wrapper = createWrapper(props);
	});
	describe("initial state", () => {
		it("should have default date state", () => {
			const date = new Date().toDateString();
			expect(wrapper.state().date).toEqual(date);
		});
		it("should have default baseCurrency state", () => {
			expect(wrapper.state().baseCurrency).toEqual("USD");
		});
		it("should have default convertedCurrency state", () => {
			expect(wrapper.state().convertedCurrency).toEqual("JPY");
		});
		it("should have default baseAmount state", () => {
			expect(wrapper.state().baseAmount).toEqual(0);
		});
		it("should have default convertedAmount state", () => {
			expect(wrapper.state().convertedAmount).toEqual(0);
		});
		it("should have default currentRate state", () => {
			expect(wrapper.state().currentRate).toEqual(0);
		});
		it("should have default rates state", () => {
			expect(wrapper.state().rates).toEqual(null);
		});
	});
	describe("elements and components", () => {
		it("should render div with class wrapper", () => {
			expect(wrapper.find(".wrapper").length).toEqual(1);
		});
		it("should render div with class container", () => {
			expect(wrapper.find(".container").length).toEqual(1);
		});
		it("should render div with class row", () => {
			expect(wrapper.find(".row").length).toEqual(1);
		});
	});
});
