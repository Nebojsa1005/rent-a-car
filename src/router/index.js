import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Customers from '../views/Customers.vue'
import CreateCustomer from '../views/Customers/CreateCustomer.vue'
import CreateCar from '../views/Cars/CreateCar.vue'
import AllCars from '../components/AllCars/AllCars.vue'
import EditCar from '../views/Cars/EditCar.vue'
import RentCarDetails from '../views/Cars/RentCarDetails.vue'
import AllCustomers from '../views/Customers/AllCustomers.vue'
import EditCustomer from '../views/Customers/EditCustomer.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/all-cars',
    children: [
      {
        path: '/all-cars',
        component: AllCars,
        name: 'AllCars'
      },
      {
        path: '/edit-car/:id',
        name: 'EditCar',
        component: EditCar
      },
      {
        path: '/rent-car/:id',
        name: 'Rent-car',
        component: RentCarDetails,
      },
    ]
  },
  {
    path: '/create-car',
    name: 'CreateCar',
    component: CreateCar
  },
  {
    path: '/customers',
    redirect: '/all-customers',
    component: Customers,
    children: [
      {
        path: "/all-customers",
        name: 'Customers',
        component: AllCustomers,
      },
      {
        path: '/edit-customer/:id',
        name: 'EditCustomer',
        component: EditCustomer
      }, 
    ]
  },
  {
    path: '/create-customer',
    name: 'CreateCustomer',
    component: CreateCustomer,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
