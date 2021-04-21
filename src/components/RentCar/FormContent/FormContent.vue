<template>
    <div class="form-content">
    <app-base-spinner v-if="loading"></app-base-spinner>
        <h3>Chose Customer and dates</h3>
        <form @submit.prevent>
            <p class="location">Location: Ljubibratica 3</p>
            <label for="startingDate">Select a Customer <router-link to="/create-customer">Or add a new customer</router-link>
                <select name="customerId" v-model="customerId">
                    <option value="" disabled hidden>Select a Customer</option>
                    <option v-for="customer in customers" :value="customer.id">{{ customer.fullName }} - {{ customer.email }}</option>
                </select>
            </label>
            <label for="startingDate">Starting Date
                <input v-model="startingDate" min='' type="date" />
            </label>
            <label for="startingDate">Returning Date
                <input v-model="returningDate" type="date" />
            </label>
            <hr>
            <p v-if="confirmed">From: {{ start }} To: {{ end }}</p>
            <div class="total-price-content">
                <p>Total Price <span v-if="discount">( ${{ price }} - {{ discount }}% )</span></p>
                <span>${{ totalPrice }} USD</span>
            </div>
            <div class="buttons">
                <button class="btn" :disabled="disabled" :class="{ disabled: disabled}" @click="confirmData">Confirm</button>
                <button class="btn" v-if="confirmed" @click="order">Order now</button>
            </div>
            <div class="errors-content">
                <p class="error-message" v-if="count < 1">{{lagerError.text}}</p>
                <p class="error-message" v-if="!startingDate || !returningDate || !validDates">{{dateError.text}}</p>
                <p class="error-message" v-if="!customerId">{{customerError.text}}</p>
            </div>
        </form>
    </div>
</template>

<script>
import appBaseSpinner from '../../BaseSpinner/BaseSpinner.vue'
export default {
    components: {
        appBaseSpinner
    },
    // props: ['totalPrice', 'startingDate', 'returningDate', 'price', 'discount', 'confirmed', 'count'],
    props: {
        totalPrice: Number,
        startingDate: Date,
        returningDate: Date,
        price: String,
        discount: Number,
        confirmed: Boolean,
        count: Number,
        validDates: Boolean
    },
    data () {
        return {
            customerId: '',
            lagerError: {
                text: 'There are no more available cars for now'
            },
            dateError: {
                text: 'Please set both valid returning and starting dates'
            },
            customerError: {
                text: 'Please select a customer'
            }
        }
    },
    methods: {
        confirmData () {
            const confirmationData = {
                startingDate: this.startingDate,
                returningDate: this.returningDate,
                customerId: this.customerId
            }
            this.$emit('confirmed-data', confirmationData)
        },
        order () {
            this.$emit('order-now')
        }
    },
    computed: {
        start (){
            return `${this.startingDate.getDate()}/${this.startingDate.getMonth() + 1}/${this.startingDate.getFullYear()}`
        },
        end () {
            return `${this.returningDate.getDate()}/${this.returningDate.getMonth() + 1}/${this.returningDate.getFullYear()}`
        },
        disabled () {
            return this.count < 1 || (!this.startingDate || !this.returningDate) || !this.customerId || (this.startingDate > this.returningDate)
        },
        customers () {
            return this.$store.getters.customers
        },
        loading () {
            return this.$store.getters.loading
        }
    },
    async mounted () {
        this.$store.commit('loadingOn')
        await this.$store.dispatch('fetchCustomers') 
        this.$store.commit('loadingOff')
    }
}
</script>

<style scoped>

.form-content {
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #eee
}

h3 {
    margin-bottom: 20px;
}


form {
    width: 100%;
    align-items: flex-start;
}

.location {
    margin-bottom: 10px;
}

label {
    margin-bottom: 10px 0;
  width: 100%;
  text-align: left;
  margin-bottom: 12px;
}

.input-underline {
    width: 10%;
    height: 2px;
    background: black
}

.total-price-content {
    width: 100%;
    display:flex;
    justify-content: space-between;
    margin-top: 10px;
    font-weight: bold;
}

hr {
    width: 100%;
    margin: 20px 0 10px 0;
    background: 1px solid #ccc
}

.buttons {
    width: 100%;
    display: flex;
    justify-content: space-around;
}

button {
    margin: 10px auto;
}


</style>