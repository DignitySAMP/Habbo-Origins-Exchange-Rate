import { defineStore } from 'pinia';
import axios from 'axios';

export const useCreditHistoryStore = defineStore('creditHistory', {
  state: () => ({
    priceList: []
  }),
  actions: {
    async fetchPriceList() {
      try {
        const response = await axios.get('../src/stores/creditHistory.json');
        if (response.status === 200) {
          this.priceList = response.data;
        } else {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Failed to fetch price list:', error);
        throw error;
      }
    },
    hasPriceHistory(itemName) {
      const itemHistory = this.priceList.find(item => item.name === itemName);
      return itemHistory && itemHistory.prices.length > 1;
    }
  }
});
