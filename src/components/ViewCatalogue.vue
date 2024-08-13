<template>
  <div>
    <!-- Category Buttons -->
    <div class="category-buttons">
      <button
        @click="showCategoryItems('Info')"
        :class="{ active: activeCategory === 'Info' }"
        class="category-button">
        <img src="../assets/fansite/catalog_icons/info.png">
        Info
      </button>
      <button
        v-for="category in prioritizedCategories"
        :key="category.name"
        @click="showCategoryItems(category.name)"
        :class="['category-button', { active: activeCategory === category.name }]"
        class="category-button">
        <img :src="category.thumbnail">
        {{ category.name }}
      </button>
      <div class="dropdown">
        <button class="dropbtn"><img src="../assets/fansite/catalogue.png">Catalog</button>
        <div class="dropdown-content">
          <button
            v-for="category in otherCategories"
            :key="category.name"
            @click="showCategoryItems(category.name)"
            :class="['dropdown-item', { active: activeCategory === category.name }]"
            class="dropdown-item">
            <img :src="category.thumbnail">
            {{ category.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Catalogue Info Component -->
    <CatalogueInfo v-if="activeCategory === 'Info'" />

    <!-- Cards for the active category -->
    <div class="activeCategoryContainer" v-if="activeCategory && activeCategory !== 'Info'">
      <img :src="getCategoryData(activeCategory).image">
      <div class="card-container">
        <ItemCard
          v-for="item in getItemsByCategory(activeCategory)"
          :key="item.name"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useFurnitureStore } from '@/stores/furni';
import ItemCard from '@/components/ItemCard.vue';
import CatalogueInfo from '@/components/CatalogueInfo.vue';

export default {
  components: {
    ItemCard,
    CatalogueInfo
  },
  setup() {
    const furnitureStore = useFurnitureStore();
    const activeCategory = ref('Info'); // Default to 'Info'

    const prioritizedCategories = computed(() => {
      const categories = furnitureStore.categories;
      const priorities = ['Rares', 'HC'];
      const prioritized = categories.filter(cat => priorities.includes(cat.name));
      return prioritized;
    });

    const otherCategories = computed(() => {
      const priorities = ['Rares', 'HC'];
      return furnitureStore.categories
        .filter(cat => !priorities.includes(cat.name))
        .sort((a, b) => a.name.localeCompare(b.name));
    });

    const showCategoryItems = (category) => {
      activeCategory.value = category === activeCategory.value ? 'Info' : category;
    };

    const getItemsByCategory = (category) => {
      return furnitureStore.getItemsByCategory(category);
    };

    const getCategoryData = (catName) => {
      return furnitureStore.getCategoryData(catName);
    };

    // Watch activeCategory and set it to 'Info' if it is null
    watch(activeCategory, (newVal) => {
      if (!newVal) {
        activeCategory.value = 'Info';
      }
    });

    return {
      activeCategory,
      showCategoryItems,
      getItemsByCategory,
      getCategoryData,
      prioritizedCategories,
      otherCategories
    };
  }
};
</script>


<style scoped>
.category-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: .25rem;
}

.category-button {
  margin-right: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: .5rem;
}

.category-button.active {
  background-color: #00813e;
  border-color: #8eda55;
}

.category-button.active:hover {
  background-color: #00ab54;
  border-color: #b9f373;
}

.card-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  min-height: 100%;
  width: 100%;
}

.activeCategoryContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.activeCategoryContainer img {
  padding: 1rem;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: #ffb31b;
  border-color: #b67e0c;
  color: #402d0a;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  height:5vh;
  gap: .5rem;
}



.dropbtn:hover {
  background-color: #f8cf7c;
  border-color: #fdbd3d;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f7c666;
  border: 2px solid #e6a72b;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  max-height: 200px; /* Adjusted height to fit approximately 5 buttons */
  overflow-y: auto; /* Added scrollbar */
  border-radius:.5rem;
}

.dropdown-content .dropdown-item {
  color: black;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content button {
  background-color: #fdbd3d;
  border: none;
  box-shadow:unset;
  width:100%;
  margin-top:.1rem;
}

.dropdown-content button:hover {
  background-color: #e9af3b;
}

.dropdown:hover .dropdown-content {
  display: block;
}


/* Custom scrollbar styles */
.dropdown-content::-webkit-scrollbar {
  width: 8px;
}

.dropdown-content::-webkit-scrollbar-track {
  background-color: #ffb31b;
}

.dropdown-content::-webkit-scrollbar-thumb {

  background-color: #c98f1c;
  border-radius: 10px; 
  border: 2px solid #ffb31b;
}

.dropdown-content::-webkit-scrollbar-thumb:hover {
  background-color: #f8cf7c;
}
</style>
