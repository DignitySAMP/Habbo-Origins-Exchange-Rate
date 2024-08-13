<template>
  <div class="card">
    <div class="card-content">
      <h3>{{ item.name }}</h3>
      <div v-if="item.image" class="card-image">
        <img :src="item.image" alt="Item Image">
      </div>
      <div v-else>
        <p>No Image Available</p>
      </div>
      <div>
        
        <CostComponent :credits="item.credits" :sofaValue="calculateSofaValue(item.credits)" />
      </div>
      <div v-if="hasPriceHistory(item.name)">
        <button :disabled="buttonDisabled" @click="togglePriceContainer(item.name)">Toggle Price History</button>
        <div v-show="priceContainersVisible[item.name]" class="pricecontainer">
          <canvas :ref="setCanvasRef(item.name)"></canvas>
        </div>
      </div>
      <div v-else>
        <p class="fake-btn">No price history for this item</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick, watch } from 'vue';
import { useCreditHistoryStore } from '@/stores/creditHistory';
import { useFurnitureStore } from '@/stores/furni';
import Chart from 'chart.js/auto';
import CostComponent from '@/components/CostComponent.vue'; // Import CostComponent

export default {
  props: {
    item: Object
  },
  components: {
    CostComponent
  },
  setup(props) {
    const creditHistoryStore = useCreditHistoryStore();
    const furniStore = useFurnitureStore();
    const charts = ref({});
    const canvasRefs = ref({});
    const priceContainersVisible = ref({});
    const buttonDisabled = ref(false);

    const setCanvasRef = (itemName) => (el) => {
      if (el) {
        canvasRefs.value[itemName] = el;
      }
    };

    const hasPriceHistory = (itemName) => {
      return creditHistoryStore.hasPriceHistory(itemName);
    };

    const togglePriceContainer = (itemName) => {
      buttonDisabled.value = true;
      setTimeout(() => {
        buttonDisabled.value = false;
      }, 700);

      priceContainersVisible.value[itemName] = !priceContainersVisible.value[itemName];
      if (priceContainersVisible.value[itemName]) {
        nextTick(() => {
          createChart(itemName);
        });
      }
    };

    const createChart = (itemName) => {
      const itemHistory = creditHistoryStore.priceList.find(i => i.name === itemName);

      if (itemHistory && itemHistory.prices.length > 1) {
        const dates = itemHistory.prices.map(price => price.date);
        const prices = itemHistory.prices.map(price => price.amount);

        let formattedDates = [];

        dates.forEach((date) => {
          let newDate = new Date(date);
          let month = newDate.getMonth() + 1;
          formattedDates.push(`${newDate.getDate().toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`);
        });

        nextTick(() => {
          const canvas = canvasRefs.value[itemName];

          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              if (charts.value[itemName]) {
                charts.value[itemName].destroy();
              }

              charts.value[itemName] = new Chart(ctx, {
                type: 'line',
                data: {
                  labels: formattedDates,
                  datasets: [{
                    label: `${itemName}`,
                    data: prices,
                    fill: true,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.5
                  }]
                },
                options: {
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: false,
                    }
                  }
                }
              });
            } else {
              console.error(`Failed to get 2D context from canvas element.`);
            }
          } else {
            console.error(`Failed to find canvas element.`);
          }
        });
      }
    };

    const calculateSofaValue = (credits) => {
      const sofaItem = furniStore.items.find(item => item.name === 'Sofa' && item.category === 'HC');
      if (!sofaItem) return 0;

      const sofaHistory = creditHistoryStore.priceList.find(item => item.name === 'Sofa' && item.category === 'HC');
      if (!sofaHistory || !sofaHistory.prices.length) return 0;

      const latestSofaPrice = sofaHistory.prices[sofaHistory.prices.length - 1].amount;
      const result = credits / latestSofaPrice;
      
      // Format to two decimal places
      return parseFloat(result.toFixed(2));
    };

    onMounted(async () => {
      await creditHistoryStore.fetchPriceList(); // Ensure priceList is populated
      if (priceContainersVisible.value[props.item.name]) {
        createChart(props.item.name);
      }
    });

    watch(() => props.item.name, () => {
      if (creditHistoryStore.priceList.length) {
        createChart(props.item.name);
      }
    });

    return {
      hasPriceHistory,
      setCanvasRef,
      togglePriceContainer,
      priceContainersVisible,
      buttonDisabled,
      calculateSofaValue
    };
  }
};
</script>



<style scoped>
.card {
  width: fit-content;
  height: fit-content;
  background-color: #f2d673;
  border: 1px solid #050a0e;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(6,19,25,.7);
  padding: 12px;
  color:#330;

}
.card h3 {
  color:#5d1208;
}

.card-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap:1rem;
}

.card-image {
  text-align: center;
  width:10vw;
  height:10vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-image img {
  max-width: 100px;
  max-height: 100px;
}

.pricecontainer {
  position: relative;
  width: 100%;
  margin-top: 10px;
  background-color: #f3c900;
  border: 1px solid #c9a700;
  border-radius: .5rem;
}
</style>
