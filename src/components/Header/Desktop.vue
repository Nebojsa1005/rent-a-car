<template>
  <div class="left-side">
    <div class="nav-item">
      <router-link to="/">Cars</router-link>
      <hr />
    </div>
    <div class="nav-item">
      <router-link to="/customers">Customers</router-link>
      <hr />
    </div>
  </div>
  <div class="right-side">
    <div class="nav-item">
      <router-link to="/create-customer">Create a Customer</router-link>
      <hr />
    </div>
    <div class="nav-item">
      <router-link to="/create-car">Create a Car</router-link>
      <hr />
    </div>
  </div>
</template>

<style>
.left-side {
  display: flex;
}

.right-side {
  display: flex;
}

.nav-item {
  margin: 0 10px;
  display: flex;
  flex-direction: column;
}

hr {
  opacity: 0;
  height: 2px;
  color: white;
  width: 10%;
  transition: all 0.25s ease-in;
}

@media (max-width: 425px) {
  .left-side,
  .right-side {
    display: none;
  }
}
</style>