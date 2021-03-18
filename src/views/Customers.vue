<template>
  <div class="customers">
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.customers {
  width: 100%;
  min-height: calc(100vh - 50px);
  position: relative;
}
</style>