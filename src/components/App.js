import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { getCurrencyData } from "../actions/shared";
import { setBaseCurrency } from "../actions/setBaseCurrency";
import { setErrorMessage } from "../actions/setErrorMessage";
import { checkCurrencyString } from "../utils/helpers";

export class App extends Component {
	// initial state
	state = {
		date: new Date().toDateString(),
		baseCurrency: "USD",
		baseAmount: 0,
		convertedCurrency: "JPY",
		convertedAmount: 0,
		rates: 0,
		currentRate: 0
	};

	/**
	 * get the initial data on mount
	 *
	 */
	componentDidMount() {
		const { baseCurrency } = this.state;
		this.getData(baseCurrency);
	}

	/**
	 * check if props property values change
	 * and set state if new
	 */
	componentDidUpdate(prevProps) {
		const { date, baseCurrency } = this.props;
		switch (true) {
			case date !== prevProps.date:
				this.setState({
					date: date
				});
				break;
			case baseCurrency !== prevProps.baseCurrency:
				this.setState({
					baseCurrency: baseCurrency
				});
				break;
		}
	}

	/**
	 * get the initial data
	 * @param {base} arg Base value for currency.
	 * if base currency code {string} is valid
	 * else set and handle invalid currency code {string}
	 */
	getData(base) {
		const {
			handleSetBaseCurrency,
			handleGetCurrencyData,
			handleSetErrorMessage
		} = this.props;
		if (checkCurrencyString(base)) {
			handleSetBaseCurrency(base);
			handleGetCurrencyData(base);
		} else handleSetErrorMessage("currency");
		// handle the error with a modal or something...
	}

	render() {
		const { date } = this.state;
		return (
			<div className="wrapper">
				<LoadingBar />
				<div className="container">
					<div className="row">{date}</div>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		handleSetBaseCurrency: base => {
			dispatch(setBaseCurrency(base));
		},
		handleGetCurrencyData: base => {
			dispatch(getCurrencyData(base));
		},
		handleSetErrorMessage: error => {
			dispatch(setErrorMessage(error));
		}
	};
}

function mapStateToProps({ date, loadingBar }) {
	return {
		date:
			typeof date.currencyDate !== "undefined" ? date.currencyDate : null,
		isLoaded:
			typeof loadingBar.default !== "undefined"
				? loadingBar.default
				: null
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
