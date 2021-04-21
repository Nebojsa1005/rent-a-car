<template>
  <div class="section edit-customer form-page" v-if="customer">
    <h1 class="heading-title">Edit a Customer</h1>
    <form @submit.prevent>
      <label class="label" for="fullName"
        >Full Name
        <input id="fullName" type="text" v-model="customer.fullName" />
      </label>
      <label class="label" for="phoneNumber">
        Phone Number
        <input type="text" id="phoneNumber" v-model="customer.phoneNumber" />
      </label>
      <label class="label" for="email"
        >Email
        <input type="text" id="email" v-model="customer.email" />
      </label>
      <button class="btn" @click="submit">Edit</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    async submit() {
      this.$store.commit("loadingOn");
      await this.$store.dispatch("updateCustomer", {
        customer: this.customer,
        editingCustomer: true,
      });
      this.$store.commit("loadingOff");
      this.$router.push("/all-customers");
    },
  },
  computed: {
    ...mapGetters(["customerToBeEdited"]),
    customer() {
      return this.customerToBeEdited;
    },
  },
  activated() {
    this.$store.commit("customerToBeEdited", this.$route.params.id);
  },
};
</script>
