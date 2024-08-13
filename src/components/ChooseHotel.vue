<template>
    <div class="console-outer">
      <div class="console">
        <div class="console-title">
          <p class="console-title-inner">Choose Hotel</p>
        </div>
        <div class="console-inner">
          <div class="console-container">
            <p :class="{ selected: selectedHotel === 'EN' }" @click="selectHotel('EN')">
              <img class="console-icon" src="../assets/furni/flags/Flag_2.gif"> EN
            </p>
            <p :class="{ selected: selectedHotel === 'ES' }" @click="selectHotel('ES')">
              <img class="console-icon" src="../assets/furni/flags/Flag_12.gif"> ES
            </p>
            <p :class="{ selected: selectedHotel === 'BR' }" @click="selectHotel('BR')">
              <img class="console-icon" src="../assets/furni/flags/Flag_22.gif"> BR
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { saveUserHotel, getUserHotel } from '@/stores/hotelPicker.js';
  
  export default {
    name: 'ChooseHotel',
    setup() {
      const selectedHotel = ref(null);
  
      const selectHotel = (hotel) => {
        selectedHotel.value = hotel;
        saveUserHotel(hotel);
      };
  
      onMounted(() => {
        selectedHotel.value = getUserHotel();
      });
  
      return {
        selectedHotel,
        selectHotel
      };
    },
  };
  </script>
  
  <style scoped>
  .console-outer {
    border: 2px solid black;
    border-radius: .5rem;
    width: fit-content;
  }
  .console {
    padding: .3rem;
    background-color: #ffcb00;
    border: 3px solid #ffffaa;
    border-radius: .5rem;
  }
  .console-inner {
    background-color: #ffcb00;
    border: 4px solid #c59d00;
    border-radius: .5rem;
  }
  .console-container {
    padding: .75rem;
    background-image: url('../assets/fansite/console/bg.png');
    background-size: contain;
    border-radius: .3rem;
    border: 2px solid black;
  
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  
    color: #DEDEDE;
    text-align: center;
    vertical-align: middle;
  }
  
  .console-icon {
    width: 1rem;
    margin-right: .25rem;
    text-align: center;
  }
  
  .console-title {
    background-image: url('../assets/fansite/console/dots.png');
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: .25rem;
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
  }
  .console-title-inner {
    background-color: #ffcb00;
    color: #86742c;
    font-weight: bold;
    font-size: .75rem;
    line-height: .75rem;
    width: fit-content;
    padding: 0 .5rem 0 .5rem;
  }
  
  .console-container>p {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center; 
  }
  .console-container>p:hover {
    cursor:pointer;
  }

  .selected {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding:.25rem;
    background-color: #00813e;
    border: 2px solid  #8eda55;
    border-radius:.25rem;
    color: white;
  }
  </style>
  