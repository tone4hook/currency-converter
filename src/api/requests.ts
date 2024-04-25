import axios from 'axios';

interface ConversionRates {
  [key: string]: number;
}

export interface ConversionResult {
  date: string;
  [currency: string]: ConversionRates | string;
}

// Define a type for the currency data
export type CurrencyData = {
  [key: string]: number;
};

// Define a type for the currency list
export type CurrencyList = {
  [key: string]: string;
};

// Async function to get the currency data
export async function getCurrencyData(
  baseCurrency: string,
  date: string = 'latest',
): Promise<ConversionResult | undefined> {
  try {
    const response = await axios.get<ConversionResult>(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${baseCurrency}.json`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Async function to get the currency list
export async function getCurrencyList(): Promise<CurrencyList | undefined> {
  try {
    const response = await axios.get<CurrencyList>(
      'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json',
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function convertCurrency(
  fromCurrency: string,
  toCurrency: string,
  amount: number,
): Promise<number | undefined> {
  try {
    const data = await getCurrencyData(fromCurrency);
    if (!data || typeof data[fromCurrency] === 'string') {
      throw new Error(`No conversion data found for currency: ${fromCurrency}`);
    }
    const conversionRates: ConversionRates =
      typeof data[fromCurrency] === 'string'
        ? {}
        : (data[fromCurrency] as ConversionRates);
    const conversionRate = conversionRates[toCurrency];
    if (conversionRate === undefined) {
      throw new Error(
        `No conversion rate found from ${fromCurrency} to ${toCurrency}`,
      );
    }
    return amount * conversionRate;
  } catch (error) {
    throw error;
  }
}
