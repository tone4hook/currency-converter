import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getCurrencyList, convertCurrency } from '@/api/requests';
import { CurrencyStore, ErrorStore } from '@/stores/types';
import { ConversionResult, CurrencyList } from '@/api/types';

export const useCurrencyStore = defineStore<'currency', CurrencyStore>(
  'currency',
  () => {
    const errorStore = ref<ErrorStore | undefined>(undefined);

    const isLoading = ref(false);
    const currencyList = ref<CurrencyList | undefined>(undefined);
    const conversionResult = ref<number | undefined>(undefined);
    const currencyData = ref<ConversionResult | undefined>(undefined);

    async function handleError(error: any) {
      const { useErrorStore } = await import('currency_vista/ErrorStore');
      errorStore.value = useErrorStore();
      const errorMessage =
        error.response?.data?.message || error.message || 'An error occurred';
      console.log('From: @remote | calling @host setError action.');
      errorStore.value?.setError(true, errorMessage);
    }

    async function fetchCurrencyList() {
      console.log('From: @remote | fetchCurrencyList action called.');
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
      fetchCurrencyList,
      fetchConversionResult,
    };
  },
);
