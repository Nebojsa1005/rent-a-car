<template>
    <div class="pricing">
        <table>
            <thead>
                <tr>
                    <th>Number of days</th>
                    <th>Price per Day</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>More then 3 days</th>
                    <th>5% discount</th>
                </tr>
                <tr>
                    <th>More then 5 days</th>
                    <th>7% discount</th>
                </tr>
                <tr>
                    <th>More then 10 days</th>
                    <th>10% discount</th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>

.pricing {
  margin-bottom: 10px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead th {
    font-weight: bold;
}

th {
    border: 1px solid #eee;
    height: 40px;
    font-weight: 400;
    padding-left: 10px; 
    text-align: left;
}
</style>