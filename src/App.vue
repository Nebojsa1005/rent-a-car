<template>
  <app-base-spinner v-if="loading"></app-base-spinner>
  <app-side-menu></app-side-menu>
  <app-navigation></app-navigation>
  <router-view v-slot="{ Component }">
    <transition name="slide" mode="out-in">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
import appSideMenu from "./components/UI/SideMenu.vue";
import appNavigation from "./components/Header/Navigation.vue";
import appBaseSpinner from "./components/BaseSpinner/BaseSpinner.vue";
export default {
  components: {
    appNavigation,
    appBaseSpinner,
    appSideMenu,
  },
  computed: {
    loading() {
      // return true
      return this.$store.getters.loading;
    },
  },
  async mounted() {
    await this.$store.dispatch("fetchCars");
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #2c3e50;
  position: relative;
  overflow: hidden;
}

.section {
  padding: 20px 10px;
  width: 100%;
  min-height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* -------------NAVIGATION STYLES --------------*/
#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  color: white;
  transition: all 0.25s ease;
}

#nav a.router-link-active + hr,
#nav a:hover + hr {
  opacity: 1;
  width: 100%;
}

.form-page {
  background: #eee;
}
/* ---------HEADING TITLE STYLE -------------- */
.heading-title {
  margin: 20px 0;
}
/* ------------FORM STYLES ----------- */
form {
  display: flex;
  flex-direction: column;
  width: 30%;
  align-items: center;
  justify-content: center;
}

label {
  width: 100%;
  text-align: left;
  margin-top: 10px;
}

input,
select {
  width: 100%;
  height: 35px;
  border: 1px solid transparent;
  border-radius: 7px;
  padding-left: 10px;
  margin: 5px 0 10px 0;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 3px 3px 4px gray;
  -moz-box-shadow: 3px 3px 4px gray;
  -webkit-box-shadow: 3px 3px 4px gray;
}

input:focus,
input:hover,
select:focus,
select:hover {
  width: 100%;
  border: 1px solid black;
  background: white;
}

.btn {
  margin: 10px 10px;
  padding: 10px 20px;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 16px;
  background: none;
  outline: none;
  transition: all 0.25s ease;
  font-weight: bold;
  cursor: pointer;
}

.btn:hover,
.btn:active {
  background: black;
  color: white;
}

.form-btn {
  margin-top: 20px;
}

button:disabled {
  cursor: not-allowed;
}
/* -------------ERRORS AND DISABLED BUTTONS STYLEs----------- */
.errors-content {
  width: 100%;
}

.error-message {
  text-align: center;
  color: red;
  margin: 5px 0;
}

/* -----------ROUTER VIEW ANIMATION------------- */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* -------------LIST ANIMATION--------------- */

.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}

.fade-leave-active {
  position: absolute;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(50px);
}
.fade-move {
  transition: transform 0.3s ease;
}

/* ===========MEDIA QUERIES =============== */

@media (max-width: 1024px) {
  form {
    width: 50%;
  }
}

@media (max-width: 768px) {
  form {
    width: 60%;
  }
}

@media (max-width: 425px) {
  form {
    width: 80%;
  }
}

@media (max-width: 320px) {
  form {
    width: 90%;
  }
}
</style>
