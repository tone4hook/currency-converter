import React from "react";
import { App } from "../App";
import { shallow } from "enzyme";

function createTestProps(props) {
	return {
		isLoaded: 0,
		date: "Mon Dec 17 2018",
		baseCurrency: "USD",
		convertedCurrency: "JPY",
		baseAmount: 0,
		convertedAmount: 0,
		rates: {},
		currentRate: 0,
		errorMessage: {},
		// dispatch action handlers
		handleSetBaseCurrency: jest.fn(),
		handleGetCurrencyData: jest.fn(),
		handleSetErrorMessage: jest.fn(),
		handleSetConvertedCurrency: jest.fn(),
		handleSetBaseAmount: jest.fn(),
		handleSetConvertedAmount: jest.fn(),
		handleSetCurrentRate: jest.fn(),
		// allow to override common props
		...props
	};
}

let wrapper, instance;
const createWrapper = props => shallow(<App {...props} />);

describe("rendering", () => {
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

describe("lifecycle", () => {
	beforeEach(() => {
		const props = createTestProps();
		wrapper = createWrapper(props);
	});
	describe("componentDidMount", () => {
		beforeEach(() => {
			instance = wrapper.instance();
		});
		it("should call getData method", () => {
			const spy = jest.spyOn(instance, "getData");
			instance.componentDidMount();
			expect(instance.getData).toHaveBeenCalled();
		});
	});
});
