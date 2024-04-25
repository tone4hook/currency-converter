<template>
  <div class="container">
    <div>
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
    <h1 v-if="currencyStore.conversionResult">
      {{ currencyStore.conversionResult }}
    </h1>
    <p v-else>Enter a value and currencies</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import useCurrencyStore from '../stores/currency';

const currencyStore = useCurrencyStore();

// Define component state
const fromCurrency = ref('');
const toCurrency = ref('');
const amount = ref(0);

onMounted(() => {
  currencyStore.fetchCurrencyList();
});

// Watch for changes in fromCurrency, toCurrency, or amount and fetch conversion result
watch(
  [fromCurrency, toCurrency, amount],
  async () => {
    if (fromCurrency.value && toCurrency.value && amount.value) {
      await currencyStore.fetchConversionResult(
        fromCurrency.value,
        toCurrency.value,
        amount.value,
      );
    }
  },
  { immediate: true },
);
</script>
