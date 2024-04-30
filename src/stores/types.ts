import { Ref } from 'vue';
import { ConversionResult, CurrencyList } from '@/api/types';

/**
 * Error store types
 * */
export interface IError {
  hasError: boolean;
  message: string;
}

export interface ErrorStoreState {
  error: Ref<IError>;
}

export interface ErrorStoreActions {
  setError: (hasError: boolean, message: string) => void;
  clearError: () => void;
}

export type ErrorStore = ErrorStoreState & ErrorStoreActions;

/**
 * Currency store types
 * */
interface CurrencyStoreState {
  isLoading: Ref<boolean>;
  currencyData: Ref<ConversionResult | undefined>;
  currencyList: Ref<CurrencyList | undefined>;
  conversionResult: Ref<number | undefined>;
}

interface CurrencyStoreActions {
  fetchCurrencyList: () => Promise<void>;
  fetchConversionResult: (
    fromCurrency: string,
    toCurrency: string,
    amount: number,
  ) => Promise<void>;
}

export type CurrencyStore = CurrencyStoreState & CurrencyStoreActions;
