import React, { Component } from "react";

class CurrencyCard extends Component {
	// state for input and select values
	state = {
		currencyValue: "",
		amountValue: ""
	};

	/**
	 * check if props property values change
	 * and set state if new
	 */
	componentDidUpdate(prevProps) {
		if (this.props.currency !== prevProps.currency) {
			this.setState({
				currencyValue: this.props.currency
			});
		}
		if (this.props.amount !== prevProps.amount) {
			this.setState({
				amountValue: this.props.amount.toFixed(2)
			});
		}
	}

	/**
	 * handleCurrencyChange() handles
	 * onChange event from select element,
	 * then sets state and calls setCurrency()
	 */
	handleCurrencyChange(event) {
		const { setCurrency } = this.props;
		this.setState({
			currencyValue: event.target.value
		});
		setCurrency(event.target.value);
	}

	/**
	 * handleAmountChange() handles
	 * onChange event from input element,
	 * then sets state and calls setAmount()
	 */
	handleAmountChange(event) {
		const { setAmount } = this.props;
		this.setState({
			amountValue: event.target.value
		});
		setAmount(event.target.value);
	}

	render() {
		// props properties
		const { currency, amount, rates } = this.props;

		// state properties
		const { currencyValue, amountValue } = this.state;

		// if rates is not loadeded
		if (rates === null || typeof rates === "undefined")
			return <p>loading...</p>;

		// once rates is loaded
		return (
			<div className="column">
				<div>Currency Card</div>
				<select
					value={currencyValue}
					onChange={this.handleCurrencyChange.bind(this)}
				>
					{Object.keys(rates).map(item => (
						<option key={item} value={item}>
							{rates[item].type}
						</option>
					))}
				</select>
				<input
					type="number"
					value={amountValue}
					onChange={this.handleAmountChange.bind(this)}
				/>
			</div>
		);
	}
}

export default CurrencyCard;
