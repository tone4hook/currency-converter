import { defineStore } from 'pinia';
import { ref } from 'vue';

interface IError {
  hasError: boolean;
  message: string;
}

const useErrorStore = defineStore('error', () => {
  const error = ref<IError>({ hasError: false, message: '' });

  function setError(hasError: boolean, message: string) {
    error.value = { hasError, message };
  }

  function clearError() {
    error.value = { hasError: false, message: '' };
  }

  return {
    error,
    setError,
    clearError,
  };
});

export default useErrorStore;
