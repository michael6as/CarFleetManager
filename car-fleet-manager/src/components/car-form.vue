<template>
  <div class="car-form-wrapper">
    <!--<img :src="logo" class="logo"/>-->

    <div class="car-form">

      <div class="header-md">User Details</div>
      <div class="car-details">
        <input type="text" placeholder="Car Name" name="carName" v-model="carName"/>

        <select class="carType-dropdown" v-model="carType">
          <option value="SUV">SUV</option>
          <option value="Truck">Truck</option>
          <option value="Private">Private</option>
        </select>

        <input type="text" disabled="true" placeholder="Created Date" name="timeCreated" v-model="timeCreated"/>

        <input type="text" disabled="true" placeholder="LastUpdated" name="timeCreated" v-model="lastUpdated"/>
      </div>

        <input type="file" id="fileUpload" @change="onSelectFile"/>
        <label for="fileUpload" class="add-photo-wrapper">
          <!--<div class="add-photo-btn">-->
            <!--<img :src="addIcon"/>-->
            <!--<span>{{this.photo? 'Update' : 'Add'}} Photo</span>-->
          <!--</div>-->
          <img class="current-photo" :src="currentPhoto"/>
        </label>
      </div>

      <div class="actions">
        <div class="clear-btn" @click="clear();selectCar()">{{id? 'Cancel' : 'Clear'}}</div>
        <div class="add-btn" @click="add">{{id? 'Update' : 'Add'}}</div>
        <div class="delete-btn" v-show="id? true : false" @click="this.delete">Delete {{carName}}</div>
      </div>

    </div>
</template>

<script>
  import logo from '@/assets/logo.png'
  import addIcon from '@/assets/add.svg'
  import addPhoto from '@/assets/add-photo.png'
  import {mapMutations,mapState} from 'vuex'

export default {
  props: ['car'],
  data () {
    return {
      // addUpdateIcon,
      // deleteIcon,
      id:null,
      carName:null,
      carType:null,
      timeCreated:null,
      lastUpdated:null,
      picture:null
    }
  },
  computed: {
    ...mapState(['selectedCar', 'allCars']),
    currentPhoto () {
      if (this.photo) return this.photo
      return addPhoto
    }
  },
  watch:{
    selectedCar (selectedCar) {
        this.clear()

        if(selectedCar){
            this.id = selectedCar.id
            this.carName = selectedCar.carName
            this.carType = selectedCar.carType
            this.timeCreated = selectedCar.timeCreated
            this.lastUpdated = selectedCar.lastUpdated
            this.picture = selectedCar.picture
        }
    }
  },
  methods:{
      ...mapMutations(['updateCars','deleteCar']),
      onSelectFile(e){
        let reader = new FileReader();
        reader.readAsDataURL(e.srcElement.files[0]);
        reader.onload =  () => this.photo = reader.result
        reader.onerror = (error) => console.log('Error: ', error)
      },
      async add (){
            let car = {
                carId:this.id,
                carName:this.carName,
                carType:this.carType,
                timeCreated:this.timeCreated,
                lastUpdated:this.lastUpdated,
                picture:this.picture,
                password:this.password,
                username:this.username,
                photo:this.photo
            };

            this.updateCars(car);
            if(!this.id)
                this.clear()
      },
      async delete (){
        let car = {
          carId:this.id,
          carName:this.carName,
          carType:this.carType,
          timeCreated:this.timeCreated,
          lastUpdated:this.lastUpdated,
          picture:this.picture,
          password:this.password,
          username:this.username,
          photo:this.photo
        };

        this.deleteCar(car);
        if(!this.id)
          this.clear()
      },
      clear (){
        this.id = null;
          this.carName = null
        this.carType = null
        this.timeCreated = null
        this.lastUpdated = null
        this.picture = null
      }
  }
}
</script>

<style lang="scss" scoped>

.car-form-wrapper{
    padding-top: 1%;
    margin-top: 3%;
    flex:1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f7fa;

    .logo{
        margin-top: 98px;
        margin-bottom: 74px;
        height:62px;
        width:200px;
    }
}

.car-form{
    width:520px;
    display: flex;
    flex-direction: column;

    .car-details{
        display: grid;
        grid-gap: 20px;
        grid-template-columns: 1fr 144px;
        grid-template-rows: repeat(3, 1fr);

        .add-photo-wrapper{
            grid-row: 1 / 4;
            grid-column: 2 / 3;
            border-radius: 5px;
            box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
            border: solid 1px #e6e9f2;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;

            .add-photo-btn{
                margin-bottom: 12px;
                font-size: 12px;
                color: #9ba0b2;
                display: flex;
                align-items: center;
                padding: 5px;

                span{
                    margin-left: 10px;
                }
            }

            .current-photo{
                width:100px;
                height:92px;
                margin-bottom: -0.2px;
            }

        }
    }

    #fileUpload{
        display:none;
    }

    .actions{
        display: flex;
        margin-top: 41px;
        justify-content: flex-end;

        .clear-btn,.add-btn{
            width: 94px;
            height: 30px;
            border-radius: 4px;
            font-size: 13px;
            line-height: 1;
            color:#fff;
            display:flex;
            align-items: center;
            justify-content: center;
        }

        .clear-btn{
            background-color: #ff5575;
            margin-right: 20px;
        }

        .add-btn{
            background-color: #5891e2;
        }
    }
}
</style>
