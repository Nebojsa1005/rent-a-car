<template>
  <div class="section customers">
    <h1 class="heading-title">All Customers</h1>
    <transition-group tag="ul" name="fade">
      <li v-for="customer in customers" :key="customer.id">
        <div class="customer-content">
          <p>Full Name:</p>
          <p>{{ customer.fullName }}</p>
        </div>
        <div class="customer-content">
          <p>Email:</p>
          <p>{{ customer.email }}</p>
        </div>
        <div class="customer-content">
          <p>ID:</p>
          <p>{{ customer.id }}</p>
        </div>
        <div class="customer-content">
          <p>Rented Vehicles:</p>
          <p>{{ customer.rentedVehicles }}</p>
        </div>
        <div class="customer-content">
          <p>Phone Number:</p>
          <p>{{ customer.phoneNumber }}</p>
        </div>
        <div class="customer-content">
          <p>Last Rent</p>
          <p v-if="customer.lastRent">
            {{ new Date(new Date() - new Date(customer.lastRent)).getDate() }}
            day(s) ago
          </p>
          <p v-else>Customer has not yet rented</p>
        </div>
        <div class="buttons">
          <button class="btn" @click="edit(customer.id)">Edit</button>
          <button class="btn" @click="remove(customer.id)">Remove</button>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["removeCustomer"]),
    edit(customerId) {
      this.$store.commit("customerToBeEdited", customerId);
      this.$router.push(`/edit-customer/${customerId}`);
    },
    remove(customerId) {
      this.removeCustomer(customerId);
    },
  },
  computed: {
    ...mapActions(["fetchCustomers"]),
    customers() {
      return this.$store.getters.customers;
    },
  },
  async mounted() {
    this.$store.commit("loadingOn");
    await this.fetchCustomers;
    this.$store.commit("loadingOff");
  },
};
</script>

<style scoped>
ul {
  width: 50%;
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin: 40px 0;
  border-bottom: 2px solid #ccc;
}

.customer-content {
  width: 100%;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
  padding: 5px 0;
}

/* MEDIA QUERIES */

@media (max-width: 1024px) {
  ul {
    width: 70%;
  }
}

@media (max-width: 425px) {
  ul {
    width: 95%;
  }
}
</style>