import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const myApi = axios.create({
  baseURL: 'http://localhost:1995/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// Function for generating url with parameters encoded
let createUrlEncoded = function (query) {
  let queryUrl = '?'
  for (let keyVal in query) {
    if (queryUrl.length > 1) {
      queryUrl += '&'
    }
    let queryParam = keyVal + '=' + query[keyVal]
    queryUrl += queryParam
  }
  return queryUrl
}

export default new Vuex.Store({
  state: {
    allCars: [],
    selectedCar: null
  },
  mutations: {
    selectCar (state, car) {
      // When this changes all the components are reacted and changed
      state.selectedCar = car
    },
    getCars (state, query) {
      console.log('About to GET cars with this query' + query)
      let getUrl = 'vehicles'
      if (query !== undefined) {
        getUrl += createUrlEncoded(query)
      }
      myApi.get(getUrl).then(res => {
        state.allCars = res.data
      }).catch(e => {
        // TODO: Change to a toast mechanism for better UX
        console.log('Error While getting Cars from server' + e)
      })
    },
    updateCars (state, car) {
      console.log('About to POST to URL /vehicles with body' + car)
      myApi.post('vehicles', car).then(res => {
        state.allCars = res.data
      }).catch(e => {
        console.log('Error occurred while updating the car fleet ' + e)
      })
    },
    deleteCar (state, carId) {
      console.log('About to DELETE this ID' + carId)
      let deleteUrl = 'vehicles'
      if (carId !== undefined) {
        deleteUrl += createUrlEncoded(carId)
      }
      myApi.delete(deleteUrl).then(res => {
        state.allCars = res.data
      }).catch(e => {
        console.log('Error occurred while deleting a car ' + e)
      })
      state.selectedCar = null
    }
  }
})
