import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { getCurrencyData } from "../actions/shared";
import { setBaseCurrency } from "../actions/setBaseCurrency";
import { setErrorMessage } from "../actions/setErrorMessage";
import { checkCurrencyString, isUndefined } from "../utils/helpers";

export class App extends Component {
	// initial state
	state = {
		date: new Date().toDateString(),
		baseCurrency: "USD",
		baseAmount: 0,
		convertedCurrency: "JPY",
		convertedAmount: 0,
		rates: null,
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
		const { date, baseCurrency, rates, errorMessage } = this.props;
		switch (true) {
			case date !== prevProps.date:
				console.log("date changed");
				this.setState({
					date: date
				});
				break;

			case baseCurrency !== prevProps.baseCurrency:
				console.log("baseCurrency changed");
				this.setState({
					baseCurrency: baseCurrency
				});
				break;

			case rates !== prevProps.rates:
				console.log("rates changed");
				this.setState({
					rates: rates
				});
				break;

			case errorMessage !== prevProps.errorMessage:
				// maybe call for a modal here
				console.log(errorMessage.title);
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

function mapStateToProps({ date, loadingBar, rates, errorMessage }) {
	return {
		date: isUndefined(date.currencyDate) ? null : date.currencyDate,
		isLoaded: isUndefined(loadingBar.default) ? null : loadingBar.default,
		rates: isUndefined(rates) ? null : rates,
		errorMessage: isUndefined(errorMessage) ? null : errorMessage
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
