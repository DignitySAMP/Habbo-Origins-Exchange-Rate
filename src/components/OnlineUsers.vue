<template>
  <div class="console-outer">
    <div class="console">
      <div class="console-title">
        <p class="console-title-inner">Online Players</p>
      </div>
      <div class="console-inner">
                <div class="console-container">
          <p v-if="checkinCountEN !== null"><img class="console-icon" src="../assets/furni/flags/Flag_2.gif">{{ checkinCountEN }}</p>
          <p v-if="checkinCountES !== null"><img class="console-icon" src="../assets/furni/flags/Flag_12.gif">{{ checkinCountES }} </p>
          <p v-if="checkinCountBR !== null"><img class="console-icon" src="../assets/furni/flags/Flag_22.gif">{{ checkinCountBR }}</p>
        </div>
      </div>
    </div>
  </div>

  </template>
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'CheckinCountBox',
    setup() {
      let checkinCountEN = ref(null);
      let checkinCountES = ref(null);
      let checkinCountBR = ref(null);

      const fetchCheckinCount = async () => {
        try {
            let response = null;

            response = await axios.get('https://origins.habbo.com/api/public/origins/users');
            checkinCountEN.value = response.data.onlineUsers;

            response = await axios.get('https://origins.habbo.es/api/public/origins/users');
            checkinCountES.value = response.data.onlineUsers;
            
            response = await axios.get('https://origins.habbo.com.br/api/public/origins/users');
            checkinCountBR.value = response.data.onlineUsers;

            } catch (error) {
            console.error('Error fetching check-in count:', error);
            checkinCountEN.value = 'Error';
        }
      };
  
      onMounted(() => {
        fetchCheckinCount();

      });
  
      return {
        checkinCountEN,
        checkinCountES,
      checkinCountBR
      };
    },
  };
  </script>

<style scoped>
.console-outer {
  border: 2px solid black;
  border-radius: .5rem;
  width:fit-content;
}
.console {
  padding: .3rem;
  background-color: #ffcb00;
  border:3px solid #ffffaa;
  border-radius:.5rem;
}
.console-inner {

  background-color: #ffcb00;
  border:4px solid #c59d00;
  border-radius:.5rem;
}
.console-container {
  padding: .75rem;
  background-image:url('../assets/fansite/console/bg.png');
  background-size:contain;
  border-radius:.3rem;
  border:2px solid black;

  display: flex;
  flex-direction:row;
  justify-content: center;
  align-items:center;
  gap:1rem;

  color:#DEDEDE;
  text-align:center;
  vertical-align: middle;
}

.console-icon {
  width:1rem;
  margin-right:.25rem;
  text-align:center;
}

.console-title {
  background-image: url('../assets/fansite/console/dots.png');
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom:.25rem;
  border-top-left-radius: .25rem;
  border-top-right-radius: .25rem;

}
.console-title-inner {
  background-color: #ffcb00;
  color: #86742c;
  font-weight:bold;
  font-size:.75rem;
  line-height:.75rem;
  width:fit-content;
  padding: 0 .5rem 0 .5rem;
}

</style>
