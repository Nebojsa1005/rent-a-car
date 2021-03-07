<template>
    <div id="nav">
    <div class="left-side">
      <div class="nav-item">
        <router-link to="/">Cars</router-link>
        <hr>
      </div>
      <div class="nav-item">
        <router-link to="/customers">Customers</router-link>
        <hr>
      </div>
    </div>
      <div class="right-side">
        <div class="nav-item">
          <router-link to="/create-customer">Create a Customer</router-link>
          <hr>
        </div>
        <div class="nav-item">
          <router-link to="/create-car">Create a Car</router-link>
          <hr>
        </div>
      </div>
  </div>
</template>

<style scoped>
#nav {
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 10px 20px;
  width: 100%;
  background: #0F2027;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2C5364, #203A43, #0F2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

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
  width: 100%
  
}
</style>