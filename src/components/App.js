import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { getCurrencyData } from "../actions/shared";
import { setBaseCurrency } from "../actions/setBaseCurrency";
import { setConvertedCurrency } from "../actions/setConvertedCurrency";
import { setBaseAmount } from "../actions/setBaseAmount";
import { setConvertedAmount } from "../actions/setConvertedAmount";
import { setCurrentRate } from "../actions/setCurrentRate";
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

		const {
			date,
			baseCurrency,
			baseAmount,
			convertedCurrency,
			convertedAmount,
			rates,
			currentRate,
			errorMessage
		} = this.props;

		switch (true) {
			case date !== prevProps.date:
				console.log("date changed");
				this.setState({
					date: date
				});
				break;

			case baseCurrency !== prevProps.baseCurrency:
				console.log("baseCurrency changed");
				if (checkCurrencyString(baseCurrency)) {
					this.setState(
						{ baseCurrency: baseCurrency },
						this.getData(baseCurrency)
					);
				} else {
					console.log("call erorr handler");
				}
				break;

			case baseAmount !== prevProps.baseAmount:
				console.log("baseAmount changed");
				this.setState(
					{ baseAmount: baseAmount },
					this.setConverted()
				);
				break;

			case convertedCurrency !== prevProps.convertedCurrency:
				console.log("convertedCurrency changed");
				if (checkCurrencyString(convertedCurrency)) {
					this.setState(
						{ convertedCurrency: convertedCurrency },
						this.setRate(convertedCurrency)
					);
				} else {
					console.log("convertedCurrency: call erorr handler");
				}
				break;

			case convertedAmount !== prevProps.convertedAmount:
				console.log("convertedAmount changed");
				this.setState({
					convertedAmount: convertedAmount
				});
				break;

			case currentRate !== prevProps.currentRate:
				console.log("currentRate changed");
				this.setState({
					currentRate: currentRate
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

	/**
	 * set base amount change
	 * @param {amount} arg Base value amount.
	 * set base amount if it changes
	 * and then set converted amount
	 */
	setBase(amount) {
		const { baseAmount, handleSetBaseAmount } = this.state;
		if (baseAmount !== amount) {
			handleSetBaseAmount(amount);
		}
	}

	/**
	 * set converted amount
	 * calculate converted amount
	 * based on current rate
	 */
	setConverted() {
		const {
			baseAmount,
			currentRate,
			handleSetConvertedAmount
		} = this.state;
		const convertedAmount = baseAmount * currentRate;
		handleSetConvertedAmount(convertedAmount);
	}

	/**
	 * set currenct rate
	 * @param {rate} Rate of converted
	 * currency compared to base currency
	 */
	setRate(rate) {
		const {
			baseAmount,
			currentRate,
			handleSetCurrentRate,
			handleSetConvertedAmount,
			rates
		} = this.state;
		const newRate = rates[rate].rate;
		const convertedAmount = newRate * baseAmount;
		handleSetConvertedAmount(convertedAmount);
		handleSetCurrentRate(newRate);
	}

	/**
	 * sets state
	 * for convertedAmount and if it's new
	 * it calls setBase
	 */
	handleConvertedAmountChange(amount) {
		const { baseAmount, currentRate } = this.state;
		if (baseAmount !== amount) {
			const newBaseAmount = amount / currentRate;
			this.setState({
				convertedAmount: amount
			});
			this.setBase(newBaseAmount);
		}
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
		handleGetCurrencyData: base => {
			dispatch(getCurrencyData(base));
		},
		handleSetBaseCurrency: base => {
			dispatch(setBaseCurrency(base));
		},
		handleSetConvertedCurrency: currency => {
			dispatch(setConvertedCurrency(currency));
		},
		handleSetBaseAmount: amount => {
			dispatch(setBaseAmount(amount));
		},
		handleSetConvertedAmount: amount => {
			dispatch(setConvertedAmount(amount));
		},
		handleSetCurrentRate: rate => {
			dispatch(setCurrentRate(rate));
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
