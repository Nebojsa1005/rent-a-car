import { createStore } from 'vuex'

export default createStore({
  state: {
    wantedCar: null,
    cars: [],
    customers: [],
    carToEdit: null,
    customerToBeEdited: null,
    loading: false,
    sideMenuActive: false
  },
  mutations: {
    setCars(state, cars) {
      state.cars = cars
    },
    setCustomers(state, customers) {
      state.customers = customers
    },
    setWantedCar(state, id) {
      const filteredWantedCar = state.cars.filter(car => car.id === id)
      state.wantedCar = filteredWantedCar[0]
    },
    carToEdit(state, id) {
      let wantedCar = state.cars.filter(car => car.id === id)
      state.carToEdit = wantedCar[0]
    },
    customerToBeEdited(state, id) {
      let wantedCustomer = state.customers.filter(customer => customer.id === id)
      state.customerToBeEdited = wantedCustomer[0]
    },
    updateCarAvailability(state, id) {
      const wantedCar = state.cars.find(car => car.id === id)
      wantedCar.count--
    },
    loadingOn(state) {
      state.loading = true
    },
    loadingOff(state) {
      state.loading = false
    },
    activateSideMenu(state) {
      state.sideMenuActive = !state.sideMenuActive
    },
    disableSideMenu(state) {
      state.sideMenuActive = false
    }
  },
  actions: {
    async fetchCars({ commit }, searchData = false) {
      commit('loadingOn')
      const responseData = await fetch('https://rent-a-car-aef1c-default-rtdb.firebaseio.com/cars.json')
      const fetchedCars = await responseData.json()
      commit('loadingOff')
      let cars = []
      for (let car in fetchedCars) {
        fetchedCars[car].id = car
        cars.push(fetchedCars[car])
      }

      if (searchData) {
        let filteredCars = cars.filter(car => {
          return car.brand.toLowerCase().includes(searchData.toLowerCase()) || car.model.toLowerCase().includes(searchData.toLowerCase())
        })
        cars = filteredCars
      }
      commit('setCars', cars)
    },
    async createCar({ dispatch, commit }, newCar) {
      await fetch('https://rent-a-car-aef1c-default-rtdb.firebaseio.com/cars.json', {
        method: 'POST',
        body: JSON.stringify({
          brand: newCar.brand,
          model: newCar.model,
          construction: newCar.construction,
          fuelType: newCar.fuelType,
          seatNumber: newCar.seatNumber,
          image: newCar.image,
          price: newCar.price,
          count: newCar.count
        }),
        headers: {
          'Content-type': 'aplication/json'
        }
      })
      await dispatch('fetchCars')
    },
    async fetchCustomers({ commit }) {
      commit('loadingOn')
      const responseData = await fetch('https://rent-a-car-aef1c-default-rtdb.firebaseio.com/customers.json')
      const fetchedCustomers = await responseData.json()
      commit('loadingOff')
      let customers = []
      for (let customer in fetchedCustomers) {
        fetchedCustomers[customer].id = customer
        customers.push(fetchedCustomers[customer])
      }
      commit('setCustomers', customers)
    },
    async removeCar({ dispatch }, carId) {
      await fetch(`https://rent-a-car-aef1c-default-rtdb.firebaseio.com/cars/${carId}.json`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      })
      await dispatch('fetchCars')
    },
    async createCustomer({ commit, dispatch }, newCustomer) {
      commit('loadingOn')
      await fetch('https://rent-a-car-aef1c-default-rtdb.firebaseio.com/customers.json', {
        method: 'POST',
        body: JSON.stringify(newCustomer),
        headers: {
          'Content-type': 'aplication/json'
        },
      })
      commit('loadingOff')
      await dispatch('fetchCustomers')
    },
    order({ commit }, orderData) {
      fetch('https://rent-a-car-aef1c-default-rtdb.firebaseio.com/orders.json', {
        method: 'POST',
        body: JSON.stringify(orderData),
        headers: {
          'Content-type': 'aplication/json'
        }
      })
    },
    updateCar({ state, dispatch, commit }, carToRent) {
      fetch(`https://rent-a-car-aef1c-default-rtdb.firebaseio.com/cars/${carToRent.id}.json`, {
        method: 'PUT',
        body: JSON.stringify({
          ...carToRent
        }),
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then(() => dispatch('fetchCars'))
    },
    async editCar({ state, commit, dispatch }, carId) {
      commit('loadingOn')
      await fetch(`https://rent-a-car-aef1c-default-rtdb.firebaseio.com/cars/${carId}.json`, {
        method: 'PUT',
        body: JSON.stringify({
          ...state.carToEdit
        }),
        headers: {
          'Content-type': 'application/json'
        }
      })
      commit('loadingOff')
      dispatch('fetchCars')
    },
    async updateCustomer({ state, dispatch, commit }, data) {
      let currentCustomer = state.customers.find(customer => customer.id === data.customer.id)

      if (data.editingCustomer === true) {
        await fetch(`https://rent-a-car-aef1c-default-rtdb.firebaseio.com/customers/${currentCustomer.id}.json`, {
          method: 'PUT',
          body: JSON.stringify({
            ...data.customer,
          }),
          headers: {
            'Content-type': 'application/json'
          }
        })
      } else {
        await fetch(`https://rent-a-car-aef1c-default-rtdb.firebaseio.com/customers/${currentCustomer.id}.json`, {
          method: 'PUT',
          body: JSON.stringify({
            ...currentCustomer,
            lastRent: new Date(data.startingDate),
            rentedVehicles: currentCustomer.rentedVehicles + 1
          }),
          headers: {
            'Content-type': 'application/json'
          }
        })
      }

      dispatch('fetchCustomers')
    },
    async removeCustomer({ commit, dispatch }, customerId) {
      await fetch(`https://rent-a-car-aef1c-default-rtdb.firebaseio.com/customers/${customerId}.json`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      })
      dispatch('fetchCustomers')
    }
  },
  getters: {
    cars(state) {
      return state.cars
    },
    wantedCar(state) {
      return state.wantedCar
    },
    customers(state) {
      return state.customers
    },
    carToEdit(state) {
      return state.carToEdit
    },
    customerToBeEdited(state) {
      return state.customerToBeEdited
    },
    loading(state) {
      return state.loading
    },
    sideMenuActive(state) {
      return state.sideMenuActive
    }
  }
})