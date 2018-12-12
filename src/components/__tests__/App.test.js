import React from "react";
import { App } from "../App";
import { shallow } from "enzyme";

function createTestProps(props) {
	return {
		// common props
		getInitialData: jest.fn(),
		// allow to override common props
		...props
	};
}

describe("rendering", () => {
	describe("<App />", () => {
		let props;
		let wrapper;
		beforeEach(() => {
			props = createTestProps();
			wrapper = shallow(<App {...props} />);
		});
		it("should render a <div />", () => {
			expect(wrapper.find("div").length).toEqual(1);
		});
	});
});
