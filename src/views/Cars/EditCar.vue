<template>
    <div class="section edit-car form-page" v-if="car">
        <h1 class="heading-title">Edit a Car</h1>
        <form @submit.prevent>
            <label class="label" for="brand">Brand
                <input id="brand" type="text" v-model="car.brand" placeholder="Brand">
            </label>
            <label class="label"> Model
                <input type="text" v-model="car.model" placeholder="Model">
            </label>
            <label class="label">Construction year
                <input type="text" v-model="car.construction" placeholder="Construction year">
            </label>
            <label class="label"> Fuel Type
                <select name="fuelType" v-model="car.fuelType" id="fuel-type">
                    <option value="Petrol">Petrol</option>
                    <option value="Disel">Disel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                </select>
            </label>
            <label class="label">Number of seats
                <input type="number" v-model="car.seatNumber" placeholder="Number of seats">
            </label>
            <label class="label">Car Image url
                <input type="text" v-model="car.image" placeholder="Image url">
            </label>
            <label class="label">Price
                <input type="number" v-model="car.price" placeholder="Price">
            </label>
            <label class="label">Number of available cars
                <input type="number" v-model="car.count" placeholder="Number of aviability">
            </label>
            <button class="btn" @click="submit">Edit</button>
        </form>
  </div>
</template>

<script>
    export default {
        methods: {
            async submit () {
                await this.$store.dispatch('editCar', this.car.id)
                this.$router.push('/')
            }
        },
        computed: {
            car () {
                return this.$store.getters.carToEdit
            }
        },
        activated() {
            this.$store.commit('carToEdit', this.$route.params.id)
        }
    }
</script>

<style scoped>
.edit-car {
    width: 100%;
}
</style>
