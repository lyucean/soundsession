<template>
      <div id="selectStation">
<!--        <router-link to="/">выбрал станцию</router-link>-->
        <div v-for="data in myStations">{{data}}</div>
      </div>
</template>

<script>
import stations from '../../data/stations.js'
export default{
  name: 'selectStation',
  data(){
    return{
      myStations: stations
    }
  }
}
</script>

<style scoped>

</style>