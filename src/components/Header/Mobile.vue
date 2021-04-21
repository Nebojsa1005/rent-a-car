<template>
  <div class="nav-item">
    <i class="fas fa-bars" v-if="!activated" @click="activateSideMenu"></i>
  </div>
</template>

<script>
export default {
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

<style>
i {
  transition: all 0.3s ease;
  opacity: 0;
  justify-self: flex-end;
  color: white;
  font-size: 35px;
}

i:active {
  transform: scale(1.2);
}

@media (max-width: 425px) {
  i {
    opacity: 1;
  }
}
</style>