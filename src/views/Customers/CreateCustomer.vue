<template>
  <div class="section create-customer form-page">
    <h1 class="heading-title">Create a Customer</h1>
    <Form @submit="onSubmit">
      <Field name="fullName" v-model="fullName" placeholder="Full name*" :rules="validateFullName"/>
      <ErrorMessage class="error-message" name="fullName"></ErrorMessage>

      <Field name="email" v-model="email" placeholder="Email*" :rules="validateEmail"/>
      <ErrorMessage class="error-message" name="email"></ErrorMessage>

      <Field name="number" v-model="phoneNumber" placeholder="Phone number*" :rules="validatePhoneNumber"/>
      <ErrorMessage class="error-message" name="number"></ErrorMessage>

      <button class="btn">Create</button>
    </Form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Form, Field, ErrorMessage  } from 'vee-validate'
export default {
  components: {
    Form,
    Field,
    ErrorMessage 
  },
  data () {
    return {
      fullName: '',
      email: '',
      phoneNumber: ''
    }
  },
  methods: {
    ...mapMutations(['loadingOn', 'loadingOff']),
     
    clearInputs() {
      this.fullName = '',
      this.email = '',
      this.phoneNumber = ''
    },
    async onSubmit() {
      await this.$store.dispatch('createCustomer', {
          fullName: this.fullName,
          email: this.email,
          phoneNumber: this.phoneNumber,
          rentedVehicles: 0
      })
      this.clearInputs()
      this.$router.push('/all-customers')
    },

    validatePhoneNumber (value) {
      if (!value) {
        return 'This field is required'
      }
      if (value.length < 9) {
        return 'Must be at least 10 digit number'
      } 
      return true
    },

    validateEmail(value) {
      // if the field is empty
      if (!value) {
        return 'This field is required';
      }

      // if the field is not a valid email
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'This field must be a valid email';
      }

      // All is good
      return true;
    },

    validateFullName(value) {
      if (value.length <= 8) {
        return 'Must be at least 8 characters long'
      }
      if (value && value.trim()) {
        return true;
      }
      return 'This field is required';
    }
  }
}
</script>

<style scoped>
input:last-of-type {
  margin-bottom: 20px;
}

</style>