<template>
  <div :class="['side-menu', { active: isActive }]">
    <i class="exit far fa-times-circle" @click="disableSideMenu"></i>
    <router-link @click="disableSideMenu" to="/all-cars">All Cars</router-link>
    <router-link @click="disableSideMenu" to="/create-car"
      >Create a Car</router-link
    >
    <router-link @click="disableSideMenu" to="/customers"
      >All Customers</router-link
    >
    <router-link @click="disableSideMenu" to="/create-customer"
      >Create a Customer</router-link
    >
  </div>
</template>

<script>
export default {
  methods: {
    disableSideMenu() {
      this.$store.commit("disableSideMenu");
    },
  },
  computed: {
    isActive() {
      return this.$store.getters.sideMenuActive;
    },
  },
};
</script>

<style scoped>
.side-menu {
  position: fixed;
  z-index: 100;
  transition: all 0.3s ease;
  transform: translateX(-100%);
  height: 100vh;
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #0f2027; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2c5364,
    #203a43,
    #0f2027
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2c5364, #203a43, #0f2027);
}

a {
  font-size: 25px;
  text-decoration: none;
  color: white;
  margin: 30px;
}

.active {
  transform: translateX(0);
}

.exit {
  align-self: flex-end;
}
</style>