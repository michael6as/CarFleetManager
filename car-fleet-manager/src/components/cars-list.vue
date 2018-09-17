<template>
<div class="cars-list-wrapper">
  <div>
    <div class="header-mdb">Car Fleet Manager</div>
  </div>
  <div>
    <filter-bar/>
    <div class="header header-md"> Available Cars </div>
    <div class="car-grid">
      <div v-for="car in allCars" class="car-preview-wrapper" @click="selectCar(car)">
        <img class="car-photo" :src="car.picture"/>
        <span class="car-name"> {{car.carName}} {{car.carType}} </span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import FilterBar from './filter-bar'
import {mapMutations, mapState} from 'vuex'

export default {
  components: {FilterBar},
  computed: {
    ...mapState(['allCars'])
  },
  methods: {
    ...mapMutations(['getCars', 'selectCar'])
  },
  created: function () {
    this.getCars()
  }
}
</script>

<style lang="scss" scoped>
.cars-list-wrapper{
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.09);
  background-color: #f5f7fa;
    color: #131b3c;
}

.car-grid{
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
}
.car-preview-wrapper{
  position: relative;
  display: flex;
  align-items: center;
  padding:0 20px;
  height:64px;
  border-bottom: solid 1px #e6e9f2;

  &:hover{
    background-color: #b6cde8;
  }

  .car-photo{
    width:30px;
    height:30px;
    border-radius: 50%;
  }

  .car-name{
    flex:1;
    margin-left:12px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .delete-icon{
    display:none;
  }
}

</style>
