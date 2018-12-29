import React from "react";

const SwitchButton = props => (
	<div className="column">
		<button
			className="button"
			onClick={props.switchCurrency}
		>
			Switch
		</button>
	</div>
);

export default SwitchButton;
