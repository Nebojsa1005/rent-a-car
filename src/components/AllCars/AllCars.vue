<template>
  <div class="all-cars">
    <h1 class="heading-title">
      {{ cars.length === 0 ? "We don`t have a car like that one" : "Our cars" }}
    </h1>
    <input
      class="searchInput"
      type="text"
      v-model="carModel"
      @input="filterCars"
      placeholder="Enter Car Brand or Model"
    />
    <app-cars-list :cars="cars"></app-cars-list>
  </div>
</template>

<script>
import appCarsList from "./CarsList.vue";
export default {
  components: {
    appCarsList,
  },
  data() {
    return {
      carModel: "",
    };
  },
  methods: {
    async filterCars() {
      await this.$store.dispatch(
        "fetchCars",
        this.carModel.length !== 0 ? this.carModel : false
      );
    },
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    cars() {
      return this.$store.getters.cars;
    },
  },
  // mounted () {
  //   this.$store.dispatch('fetchCars')
  // }
};
</script>

<style scoped>
.all-cars {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.searchInput {
  margin-left: 40px;
  width: 170px;
  justify-self: flex-start;
  transition: all 0.2s ease-in;
}
.searchInput:focus {
  width: 300px;
}

/* MEDIA QUERIES */

@media (max-width: 425px) {
  .searchInput {
    margin-left: 30px;
  }
}

@media (max-width: 320px) {
  .searchInput {
    margin-left: 30px;
  }
  .searchInput:focus {
    width: 250px;
  }
}
</style>
