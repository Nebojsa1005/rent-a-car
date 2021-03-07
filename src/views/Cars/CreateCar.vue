<template>
    <div class="section create-car form-page">
    <h1 class="heading-title">Create a Car</h1>
    <Form @submit="onSubmit">
      <Field name="brand" v-model="brand" placeholder="Brand" :rules="isRequired" />
      <ErrorMessage class="error-message" name="brand"></ErrorMessage>
         
      <Field name="model" v-model="model" placeholder="Model" :rules="isRequired" />
      <ErrorMessage class="error-message" name="model"></ErrorMessage>
      
      <Field name="construction" v-model="construction" placeholder="Construction year" :rules="isRequired" />
      <ErrorMessage name="construction" class="error-message"></ErrorMessage>

      <select name="fuelType" v-model="fuelType" id="fuel-type">
        <!-- <option value="" disabled hidden>Fuel Type</option> -->
          <option value="Petrol">Petrol</option>
          <option value="Disel">Disel</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Electric">Electric</option>
      </select>

      <Field name="seatNumber" v-model="seatNumber" placeholder="Number of seats" :rules="isRequired" />
      <ErrorMessage class="error-message" name="seatNumber"></ErrorMessage>

      <Field name="imageUrl" v-model="image" placeholder="Image url" :rules="validateUrl" />
      <ErrorMessage class="error-message" name="imageUrl"></ErrorMessage>

      <Field name="price" v-model="price" placeholder="Price" :rules="isRequired" />
      <ErrorMessage class="error-message" name="price"></ErrorMessage>

      <Field name="count" v-model="count" placeholder="Number of aviability" :rules="isRequired" />
      <ErrorMessage class="error-message" name="count"></ErrorMessage>

      <button class="btn form-btn">Create</button>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
export default {
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data () {
    return {
        brand: '',
        model: '',
        construction: '',
        fuelType: 'Petrol',
        seatNumber: '',
        image: '',
        price: '',
        count: ''
    }
  },
  methods: {
    clearInputs () {
      this.brand = '',
      this.model = '',
      this.construction = '',
      this.fuelType = '',
      this.seatNumber = '',
      this.image = '',
      this.price = '',
      this.count = ''
    },

    async onSubmit() {
      let newCar = {
        brand: this.brand,
        model: this.model,
        construction: this.construction,
        fuelType: this.fuelType,
        seatNumber: this.seatNumber,
        image: this.image,
        price: this.price,
        count: this.count
      }

      this.$store.commit('loadingOn')
      await this.$store.dispatch('createCar', newCar)
      this.$store.commit('loadingOff')
      this.clearInputs()
      this.$router.push('/')
    },

    isRequired (value) {
      if (value && value.trim()) {
        return true;
      }
      if (!value) {
        return 'This field is required'
      }
    },

    validateUrl (value) {
      var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      if(!regex .test(value)) {
        return "Please enter valid URL.";
      } else {
        return true;
      }
    }
  },
  computed: {
    validateFuelType () {
      return this.fuelType.length > 0
    }
  }
}
</script>

<style scoped>
.create-car {
  width: 100%;
    background: #eee
}
</style>