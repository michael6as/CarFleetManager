// import _ from 'lodash'
import uuid from 'uuid'
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
      state.selectedCar = car
    },
    getCars (state, query) {
      let getUrl = 'vehicles'
      if (query !== undefined) {
        getUrl += createUrlEncoded(query)
      }
      myApi.get(getUrl).then(res => {
        if (res.data.length > 0) {
          state.allCars = res.data
        }
      }).catch(e => {
        alert('no new cars ' + e.message)
      })
    },
    updateCars (state, car) {
      if (!car.id) {
        car.id = uuid()
      }
      myApi.post('vehicles', car).then(res => {
        state.allCars = res.data
      }).catch(e => {
        console.log(e)
      })
    },
    deleteCar (state, car) {
      myApi.delete('vehicles', car).then(res => {
        state.allCars = res.data
      }).catch(e => {
        console.log(e)
      })
      state.selectedCar = null
    }
  }
})
