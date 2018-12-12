import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { handleInitialData } from "../actions/index";

export class App extends Component {
	// get the initial data
	componentDidMount() {
		const { getInitialData } = this.props;
		getInitialData();
	}
	render() {
		return (
			<div className="wrapper">
				<LoadingBar />
				<h1>Hello World</h1>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getInitialData: () => {
			dispatch(handleInitialData());
		}
	};
}

function mapStateToProps({ example }) {
	return {
		example,
		loading: false
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
