<!-- 
 
  TODO: make discord bot that updates the price list json, make embed menu, backups, etc
  TODO: allow for price editing using commands, run vue & price list bot on the same server + make json public
  TODO: make it so you need to select your hotel, filter prices based on hotel
-->
<template>
  <aside>
    <ChooseHotel/>
    <!-- Also add hotel picker (add hotel-specific prices/catalogs) & language picker (json support). -->
    <img src="https://images.habbo.com/web_images/habbo-web-articles/spromo_hhorigins_rare_release_June24.png" alt="Logo" width="75rem" height="auto">
    <OnlineUsers/>
  </aside>
  <header>
    <ul>
      <li> <img src="../assets/fansite/home.gif"> Homepage</li>
      <li class="active"><img src="../assets/fansite/extra.gif"> Pricelist</li>
      <li><img src="../assets/fansite/settings.png"> Settings</li>
    </ul>
  </header>
    <main>
      
      <ViewCatalogue />
      
    </main>
    <footer>
      <p>© 2004 - Sulake Oy. HABBO is a registered trademark of Sulake Oy in the European Union, the USA, Japan, the People's Republic of China and various other jurisdictions. All rights reserved.</p>
    </footer>
  </template>
  
  <script>
  import ViewCatalogue from '@/components/ViewCatalogue.vue';
  import OnlineUsers from '@/components/OnlineUsers.vue';
  import ChooseHotel from '@/components/ChooseHotel.vue';
  
  export default {
    components: {
      ViewCatalogue, OnlineUsers, ChooseHotel
    }
  };
  </script>
  