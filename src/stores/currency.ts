import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  getCurrencyData,
  getCurrencyList,
  convertCurrency,
  ConversionResult,
  CurrencyList,
} from '../api/requests';
import useErrorStore from './error';

const useCurrencyStore = defineStore('currency', () => {
  const errorStore = useErrorStore();

  const isLoading = ref(false);
  const currencyList = ref<CurrencyList | undefined>(undefined);
  const conversionResult = ref<number | undefined>(undefined);
  const currencyData = ref<ConversionResult | undefined>(undefined);

  function handleError(error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || 'An error occurred';
    errorStore.setError(true, errorMessage);
  }

  async function fetchCurrencyData(
    baseCurrency: string,
    date: string = 'latest',
  ) {
    isLoading.value = true;
    try {
      currencyData.value = await getCurrencyData(baseCurrency, date);
    } catch (error) {
      handleError(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchCurrencyList() {
    isLoading.value = true;
    try {
      const response = await getCurrencyList();
      if (!response) {
        throw new Error('Failed to fetch currency list');
      }
      currencyList.value = Object.fromEntries(
        Object.entries(response).filter(([key, value]) => value),
      ) as { [s: string]: string };
    } catch (error) {
      handleError(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchConversionResult(
    fromCurrency: string,
    toCurrency: string,
    amount: number,
  ) {
    isLoading.value = true;
    try {
      conversionResult.value = await convertCurrency(
        fromCurrency,
        toCurrency,
        amount,
      );
    } catch (error) {
      handleError(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    currencyData,
    currencyList,
    conversionResult,
    fetchCurrencyData,
    fetchCurrencyList,
    fetchConversionResult,
  };
});

export default useCurrencyStore;
