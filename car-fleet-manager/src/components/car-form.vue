<template>
  <div class="car-form-wrapper">
    <div class="car-form">
      <div class="header header-md"> Car Details</div>
      <div class="car-details">
        <div>
          Car Name : <input type="text" placeholder="Car Name" name="carName" v-model="carName"/>
        </div>
        <div>
          Car Type : <select class="carType-dropdown" v-model="carType">
            <option value="SUV">SUV</option>
            <option value="Truck">Truck</option>
            <option value="Private">Private</option>
          </select>
        </div>
        <div>
          Created Date : <input type="text" disabled="true" placeholder="Created Date" name="timeCreated" v-model="timeCreated"/>
        </div>
        <div>
          Last Updated : <input type="text" disabled="true" placeholder="LastUpdated" name="timeCreated" v-model="lastUpdated"/>
        </div>
        <input type="file" id="fileUpload" @change="onSelectFile"/>
        <label for="fileUpload" class="add-photo-wrapper">
          <div class="add-photo-btn">
          <!--<img :src="currentPhoto"/>-->
          <span>{{this.picture? 'Update' : 'Add'}} Photo</span>
          </div>
          <img class="current-photo" :src="currentPhoto"/>
        </label>
      </div>
      <div class="actions">
        <div class="delete-btn" v-show="id? true : false" @click="this.delete">Delete {{carName}}</div>
        <div class="add-btn" @click="add">{{id? 'Update' : 'Add'}}</div>
        <div class="clear-btn" @click="clear()">{{id? 'Cancel' : 'Clear'}}</div>
      </div>
      </div>

    </div>
</template>

<script>
import addPhoto from '@/assets/add.svg'
import {mapMutations, mapState} from 'vuex'

let parseToLocalDate = function (utcDate) {
  let localDate = new Date(0) // The 0 there is the key, which sets the date to the epoch
  localDate.setUTCSeconds(utcDate)
  return localDate
}
export default {
  props: ['car'],
  data () {
    return {
      id: null,
      carName: null,
      carType: null,
      timeCreated: null,
      lastUpdated: null,
      picture: null
    }
  },
  computed: {
    ...mapState(['selectedCar', 'allCars']),
    currentPhoto () {
      if (this.picture) return this.picture
      return addPhoto
    }
  },
  watch: {
    selectedCar (selectedCar) {
      this.clear()

      if (selectedCar) {
        this.id = selectedCar.carId
        this.carId = selectedCar.carId
        this.carName = selectedCar.carName
        this.carType = selectedCar.carType
        this.timeCreated = parseToLocalDate(selectedCar.timeCreated)
        this.lastUpdated = parseToLocalDate(selectedCar.lastUpdated)
        this.picture = selectedCar.picture
      }
    }
  },
  methods: {
    ...mapMutations(['updateCars', 'deleteCar']),
    onSelectFile (e) {
      let reader = new FileReader()
      reader.readAsDataURL(e.srcElement.files[0])
      reader.onload = () => this.picture = reader.result
      reader.onerror = (error) => console.log('Error: ', error)
    },
    async add () {
      let car = {
        carId: this.id,
        carName: this.carName,
        carType: this.carType,
        timeCreated: this.id ? new Date().getTime() : this.timeCreated,
        lastUpdated: new Date().getTime(),
        picture: this.picture,
        password: this.password,
        username: this.username
      }

      this.updateCars(car)
      if (!this.id) { this.clear() }
    },
    async delete () {
      this.deleteCar({'deleteId': this.id})
      if (!this.id) { this.clear() }
    },
    clear () {
      this.id = null
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
    flex:1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f7fa;
  width: 100%;

    .h1{
        margin-top: 98px;
        margin-bottom: 74px;
        height:62px;
        width:200px;
    }
}

.car-form{
  width: 100%;
  margin: 11% auto auto 3%;
    /*width:300px;*/
    display: flex;
    flex-direction: column;

    .car-details{
        display: grid;
        grid-gap: 20px;

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
            width: 250px;
            height: 200px;

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
              margin: auto auto;
            }

        }
    }

    #fileUpload{
        display:none;
    }
  input{
    width: 80%;
  }
    .actions{
        display: flex;
        margin-top: 41px;
        justify-content: flex-end;

        .clear-btn,.add-btn, .delete-btn{
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
            background-color: #c761ff;
          margin-right: auto;
          margin-left: 10px;
        }

        .add-btn{
            background-color: #66cc66;
          margin-right: 10px;
          margin-left: auto;
        }
      .delete-btn{
        background-color: #ff5575;
        margin-right: auto;
      }
    }
}
</style>
