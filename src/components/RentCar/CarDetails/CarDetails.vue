<template>
    <div class="details">
        <div class="features">
            <div class="feature">
                <p>Number of seats</p>
                <span>{{ wantedCar.seatNumber }}</span>
            </div>
            <div class="feature">
                <p>Construction year</p>
                <span>{{ wantedCar.construction }}.</span>
            </div>
            <div class="feature">
                <p>Available count</p>
                <span>{{ wantedCar.count }}</span>
            </div>
            <div class="feature">
                <p>Fuel Type</p>
                <span>{{ wantedCar.fuelType }}</span>
            </div>
            <div class="feature">
                <p>Price per day</p>
                <span>${{ wantedCar.price }} USD</span>
            </div>
            <hr>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        wantedCar: Object
    }
}
</script>

<style scoped>

.details {
    align-self: flex-start;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    width: 60%;
}

.features {
    display: flex;
    flex-direction: column;
    /* align-items: flex-start; */
    width: 100%; 
}

.feature {
    padding: 5px 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
}

</style>