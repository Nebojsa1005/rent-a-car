<template>
  <div id="nav">
    <app-desktop></app-desktop>
    <div class="nav-item ham-icon">
      <i class="fas fa-bars" v-if="!activated" @click="activateSideMenu"></i>
    </div>
  </div>
</template>

<script>
import appDesktop from "./Desktop.vue";
import appMobile from "./Mobile.vue";
export default {
  components: {
    appDesktop,
    appMobile,
  },
  methods: {
    activateSideMenu() {
      this.$store.commit("activateSideMenu");
    },
    disableSideMenu() {
      this.$store.commit("disableSideMenu");
    },
  },
  computed: {
    activated() {
      return this.$store.getters.sideMenuActive;
    },
  },
};
</script>

<style scoped>
#nav {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 10px 20px;
  width: 100%;
  background: #0f2027; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2c5364,
    #203a43,
    #0f2027
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2c5364,
    #203a43,
    #0f2027
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.ham-icon {
  opacity: 0;
  display: none;
}

i {
  transition: all 0.3s ease;
  justify-self: flex-end;
  color: white;
  font-size: 35px;
}

i:active {
  transform: scale(1.2);
}

@media (max-width: 425px) {
  .ham-icon {
    opacity: 1;
    display: inline;
  }
}
</style>