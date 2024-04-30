<template>
  <div class="container">
    <div class="card text-white bg-dark mt-3">
      <div class="card-header">Currency Converter</div>
      <div
        class="card-body d-flex justify-content-between align-items-center flex-wrap"
      >
        <div class="mb-3">
          <label for="amount" class="form-label">Amount</label>
          <input
            type="number"
            class="form-control"
            id="amount"
            v-model="amount"
          />
        </div>

        <div class="mb-3">
          <label for="fromCurrency" class="form-label">From Currency</label>
          <select class="form-select" id="fromCurrency" v-model="fromCurrency">
            <option
              v-for="(value, key) in currencyStore.currencyList"
              :key="key"
              :value="key"
            >
              {{ value }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label for="toCurrency" class="form-label">To Currency</label>
          <select class="form-select" id="toCurrency" v-model="toCurrency">
            <option
              v-for="(value, key) in currencyStore.currencyList"
              :key="key"
              :value="key"
            >
              {{ value }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div v-if="currencyStore.conversionResult" class="card bg-dark mt-3">
      <div class="card-body">
        <div
          class="d-flex justify-content-end align-items-center flex-wrap fs-5"
        >
          <div>
            <span>Resulting Amount: </span>
            <div
              v-if="currencyStore.isLoading"
              class="spinner-border spinner-border-sm mb-1 mx-2"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
            <span v-else class="text-primary">{{
              roundToTwoDecimals(currencyStore.conversionResult)
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="card bg-dark mt-3">
      <div class="card-body">
        <div
          class="d-flex justify-content-end align-items-center flex-wrap fs-5 text-warning"
        >
          Enter an amount to convert and select currencies.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useCurrencyStore } from '@/stores';

const currencyStore = useCurrencyStore();

const fromCurrency = ref(localStorage.getItem('fromCurrency') || '');
const toCurrency = ref(localStorage.getItem('toCurrency') || '');
const amount = ref(Number(localStorage.getItem('amount')) || 0);

function roundToTwoDecimals(num: number | undefined) {
  if (!num) return 0;
  return parseFloat(num.toFixed(2));
}

onMounted(() => {
  currencyStore.fetchCurrencyList();
});

watch(
  [fromCurrency, toCurrency, amount],
  async ([newFromCurrency, newToCurrency, newAmount]) => {
    // Prevent negative values for amount
    if (newAmount < 0) {
      amount.value = 0;
    }

    localStorage.setItem('fromCurrency', newFromCurrency);
    localStorage.setItem('toCurrency', newToCurrency);
    localStorage.setItem('amount', newAmount.toString());

    if (newFromCurrency && newToCurrency && newAmount) {
      await currencyStore.fetchConversionResult(
        newFromCurrency,
        newToCurrency,
        newAmount,
      );
    }
  },
  { immediate: true },
);
</script>
