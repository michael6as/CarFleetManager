<template>
    <div class="search-bar-wrapper">
      <div class="search-bar">
        <img :src="searchLogo"/>
      <input type="text" placeholder="Enter Car Name or ID" v-model="searchString">
      <select class="carType-dropdown" v-model="typeSearch">
        <option value="" disabled selected>Select CarType</option>
        <option value="SUV">SUV</option>
        <option value="Truck">Truck</option>
        <option value="Private">Private</option>
      </select>
      <button class="search-btn" @click="search">Search</button>
      </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
const searchLogo = require('@/assets/search-logo.png')

export default {
  name: 'filter-bar',
  data () {
    return {
      searchString: null,
      typeSearch: null,
      searchLogo
    }
  },
  methods: {
    ...mapMutations(['getCars']),
    async search () {
      let query = {
        searchString: this.searchString,
        carType: this.typeSearch
      }
      this.getCars(query)
      this.clear()
    },
    clear () {
      this.searchString = null
      this.typeSearch = null
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-bar-wrapper{
    /*padding-top: 10px;*/
    padding-bottom: 10px;
    /*position: absolute;*/
    width: 100%;
  }
  .search-bar{
    word-spacing: 20px;
    width: 100%;
    padding: 10px;
    margin: 0;
    background-color: #b6cde8;
    top: 0;
    left: 0;
    right: 0;
  }

  .search-bar-wrapper .search-bar img{
    margin-bottom: -10px;
    height: 40px
  }
</style>
