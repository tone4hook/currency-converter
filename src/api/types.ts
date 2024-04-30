export interface ConversionRates {
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
