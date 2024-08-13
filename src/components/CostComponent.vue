<template>
  <div class="cost-component">
    <img :src="coinImage" alt="Coin Image" />
    <span>{{ credits }}</span>
    <img src="../assets/fansite/currency/sofa.png" alt="Sofa Image" />
    <span>{{ sofaValue }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  credits: Number,
  sofaValue: Number
});

const coinImage = computed(() => {
  if (props.credits < 10) return '../src/assets/fansite/currency/coin_low.png';
  if (props.credits >= 10 && props.credits < 25) return '../src/assets/fansite/currency/coin_med.png';
  return '../src/assets/fansite/currency/coin_gold.png';
});
</script>

<style scoped>
.cost-component {
  background-color:rgba(0,0,0,.1);
  padding:.25rem;
  border-radius: .25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.cost-component img {
  width: 24px;
  height: 24px;
}
</style>
