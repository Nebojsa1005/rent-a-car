<template>
    <div class="section car-details">
        <h1 class="heading-title">{{ wantedCar.brand }} - {{ wantedCar.model }}</h1>
        <div class="content">
            <div class="left-side">
                <img class="image" :src="wantedCar.image"> 
                <app-car-details :wantedCar="wantedCar"></app-car-details>
            </div>
            <div class="right-side">
                <app-pricing></app-pricing>
                <app-form-content 
                    v-if="wantedCar" 
                    @confirmed-data="setConfirmedData" 
                    @order-now="orderNow"
                    :confirmed="confirmed" 
                    :price="wantedCar.price" 
                    :discount="discount"
                    :startingDate="startingDate" 
                    :returningDate="returningDate" 
                    :totalPrice="totalPrice"
                    :count="wantedCar.count"
                    :validDates="validDates"
                ></app-form-content>
            </div>
        </div>
    </div>
</template>

<script>
import appPricing from '../../components/RentCar/Pricing/Pricing.vue'
import appFormContent from '../../components/RentCar/FormContent/FormContent.vue'
import appCarDetails from '../../components/RentCar/CarDetails/CarDetails.vue'

import { mapActions, mapMutations } from 'vuex'

export default {
    components: {
        appPricing,
        appFormContent,
        appCarDetails
    },
    data () {
        return {
            startingDate: null,
            returningDate: null,
            customer: null,
            customerId: null,
            totalPrice: null,
            discount: 0,
            confirmed: false,
            customerBonusPeriod: null,
        }
    },
    watch: {
        validDates: function (value) {
            this.validDates = value
        }
    },
    methods: {
        ...mapActions([
            'order',
            'updateCar',
            'updateCustomer'
        ]),
        setCurrentCustomer (customerId) {
            let currentCustomer = this.customers.filter(customer =>  customer.id === customerId)
            this.customer = currentCustomer[0]
        },
        setConfirmedData (data) {
            this.setCurrentCustomer(data.customerId)
            // -----------SETTING THE DATES OF CAR USAGE-----------

            this.startingDate = new Date(data.startingDate)
            this.returningDate = new Date(data.returningDate)

            if (this.startingDate && this.returningDate && this.customer) {
                this.confirmed = true 
            }
            let daysToBeUsed = new Date(this.returningDate.getTime() - this.startingDate.getTime())
            if(this.customer.lastRent) {
                let timeDiffrence = new Date(new Date().getTime() - new Date(this.customer.lastRent).getTime())
                // 1 day has 86400000 miliseconds
                this.customerBonusPeriod = (timeDiffrence.getTime() / 86400000 ) < 60 && this.customer.rentedVehicles > 3
            }
            
            // ------------SETTING DISCOUT VALUE-----------------
            this.discount = 0
            if (this.customerBonusPeriod) {
                this.discount = 15
            } else if (new Date(daysToBeUsed).getDate() > 10) {
                this.discount = 10
            } else if (new Date(daysToBeUsed).getDate() > 5) {
                this.discount = 7
            } else if (new Date(daysToBeUsed).getDate() > 3) {
                this.discount = 5
            } 
            this.totalPrice = +(this.wantedCar.price - (this.wantedCar.price * this.discount) / 100).toFixed(2)
        },
        async orderNow () {
            this.$store.commit('updateCarAvailability', this.wantedCar.id)
            this.confirmed = false
            let orderData = {
                startingDate: this.startingDate,
                returningDate: this.returningDate,
                customer: this.customer,
                totalPrice: this.totalPrice,
                discount: this.discount,
                car: `${this.wantedCar} - ${this.wantedCar.model}`
            }
            this.$store.commit('loadingOn')
            await this.order(orderData)
            await this.updateCar(this.wantedCar)
            await this.updateCustomer({
                customer: this.customer,
                startingDate: this.startingDate,
                editingCustomer: false
            })
            this.$store.commit('loadingOff')
            this.$router.push('/')
        }
    },
    computed: {
        wantedCar () {
            return this.$store.getters.wantedCar
        },
        customers () {
            return this.$store.getters.customers
        },
        validDates() {
            return this.startingDate.getTime() < this.returningDate.getTime()

        }
    }    
}
</script>

<style scoped>
.car-details {
    /* margin-top: 50px; */
    width: 80%;
    display: flex;

}

.content {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.left-side {
    align-self: center;
    justify-content: space-between;
    width: 68%;
    display: flex;
    flex-direction: column;
    align-items: center;
   
}

.image {
    align-self: center;
    width: 100%;
}

.right-side {
    width: 30%;
    align-self: flex-start
}


</style>