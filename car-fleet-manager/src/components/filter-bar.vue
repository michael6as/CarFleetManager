<template>
    <div class="search-bar-wrapper">
      <div class="search-bar">
      <input type="text" placeholder="Enter Car Name or ID" v-model="searchString">
      <select class="carType-dropdown" v-model="typeSearch">
        <option value="SUV">SUV</option>
        <option value="Truck">Truck</option>
        <option value="Private">Private</option>
        <option value="">---</option>
      </select>
      <button class="search-btn" @click="search">Search</button>
      </div>
    </div>
</template>

<script>
  import {mapMutations} from 'vuex'

    export default {
      data () {
        return {
          searchString:null,
          typeSearch:null,
        }
      },
      methods: {
        ...mapMutations(['getCars']),
        async search () {
          let query = {
            searchString:this.searchString,
            carType:this.typeSearch,
          };
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
    position: absolute;
    width: 100%;
  }
  .search-bar{
    width: 100%;
    padding: 10px;
    margin: 0;
    background-color:coral;
    top: 0;
    left: 0;
    right: 0;
  }
</style>
