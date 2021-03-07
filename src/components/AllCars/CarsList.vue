<template>
    <transition-group tag="ul" name="fade" >
        <li v-for="car in cars" :key="car.id">
            <div class="car-card">
                <img :src="car.image">
                <p>
                    <span class="brand">{{ car.brand }}</span>
                    {{ car.model }}
                </p>
                <div class="price-tag">${{ car.price }} a day</div>
                <div class="features">
                    <div class="feature">
                        <i class="fas fa-male"></i>
                        <span class="decription">Seats</span>
                        <span class="feature-span">{{ car.seatNumber }}</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-birthday-cake"></i>
                        <span class="decription">Made</span>
                        <span class="feature-span">{{ car.construction }}</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-gas-pump"></i>
                        <span class="decription">Fuel</span>
                        <span class="feature-span">{{ car.fuelType }}</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-check-circle"></i>
                        <span class="decription">On lager</span>
                        <span class="feature-span">{{ car.count }}</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-dollar-sign"></i>
                        <span class="decription">Price</span>
                        <span class="feature-span">${{ car.price }} USD</span>
                    </div>
                </div>
                <div class="buttons">
                    <div>
                        <button class="btn" @click="edit(car)">Edit</button>
                        <button class="btn" @click="remove(car.id)">Delete</button>
                    </div>
                    <button class="btn" @click="rent(car.id)">Rent</button>
                </div>
            </div>
        </li>
    </transition-group>
</template>

<script>
export default {
    props: {
        cars: Array
    },
    methods: {
        edit (car) {
            this.$router.push(`/edit-car/${car.id}`)
        },
        async remove (carId) {
            this.$store.commit('loadingOn')
            await this.$store.dispatch('removeCar', carId)
            this.$store.commit('loadingOff')
        },
        rent (carId) {
            this.$store.commit('setWantedCar', carId)
            this.$router.push(`/rent-car/${carId}`)
        }
    },
}
</script>

<style scoped>

ul {
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

ul li {
    width: 32%;
    margin: 10px 0;
}

.car-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    border-right: 1px solid #ccc;
    border-top: 1px solid #ccc;
    padding: 10px 10px;
}

img {
    width: 100%;
}

p {
    margin: 5px 0;
    text-align: left;
}

.brand {
    font-size: 20px;
}

.price-tag {
    position: absolute;
    top: 0;
    right: 0;
    padding: 7px 24px;
    background: red;
    color: white;
    font-weight: bold;
}

.features {
    width: 100%;
    margin: 10px 0 15px 0;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.feature {
    display: flex;
    flex-direction: column;
    transition: transform 0.25s ease;
}

.feature:hover {
    transform: scale(1.1);
}

i {
    font-size: 20px;
    margin-bottom: 5px;
}

.decription {
    font-weight: bold;
    margin-bottom: 5px;
}

.buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 10px;
}

</style>