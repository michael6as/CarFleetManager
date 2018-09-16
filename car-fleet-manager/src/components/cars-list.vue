<template>
<div class="cars-list-wrapper">
    <div class="header header-md"> Available Cars </div>
  <div v-for="car in allCars" class="car-preview-wrapper" @click="selectCar(car)">
    <img class="car-photo" :src="car.picture"/>
    <span class="car-name"> {{car.carName}} {{car.carType}} </span>
  </div>
</div>
</template>

<script>
  import {mapMutations,mapState} from 'vuex'

export default {
  computed:{
    ...mapState(['allCars'])
  },
  methods:{
    ...mapMutations(['getCars', 'selectCar'])
  },
  created: function () {
    this.getCars()
  }
}
</script>

<style lang="scss" scoped>
.cars-list-wrapper{
    margin-top: 3%;
    flex:0 0 280px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.09);
    color: #131b3c;

    .header{
        height:64px;
        border-bottom: solid 1px #e6e9f2;
        padding-left: 20px;
        display: flex;
        align-items: center;
    }
}
.car-preview-wrapper{
  position: relative;
  display: flex;
  align-items: center;
  padding:0 20px;
  height:64px;
  border-bottom: solid 1px #e6e9f2;

  &:hover{
    background-color: #f5f7fa;

    .delete-icon{
      display: initial;
    }
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
