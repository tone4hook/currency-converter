/**
 * @const The api url string without base value.
 */
const baseUrl = "https://api.exchangeratesapi.io/latest?base=";
/**
 * Fetch currency data from the api.
 * @param {base} arg Base value for currency.
 * @param {url} arg Api url string with default value.
 */
export const fetchRequest = (base = "USD", url = baseUrl) => {
	return fetch(`${url}${base}`)
		.then(function(response) {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json();
		})
		.catch(function(error) {
			return {
				error: error
			};
		});
};