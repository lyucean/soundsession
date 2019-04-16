<template>
  <div class="select-station">
    <div class="select-station__close">
      <router-link to="/">
        <img v-bind:style="{ opacity: leaveOpacity }" class="select-station__close-icon"
             src="../../assets/selector_station_close.svg">
        </router-link>
    </div>
      <transition-group class="select-station__grid"
                        appear
                        appear-to-class="station_link-appear-to-class"
                        appear-active-class="station_link-appear-active-class"
                        tag="div">
            <div class="station" ref="station" v-for="(station, index) in myStations"
               v-bind:key="index"
               v-bind:style="{ background: station.colorBackground, opacity: leaveOpacity, 'transition-delay': index * 41 + 'ms' }">
          <router-link to="/" class="station_link">
            <div class="station_wrap"
                 v-bind:style="{ color: station.colorText}">
              <div class="station__title">{{station.title}}</div>
              <div class="station__genres">{{station.genres}}</div>
            </div>
          </router-link>
        </div>
      </transition-group>
  </div>
</template>

<style src="./selectStation.css" scoped></style>
<script>
import stations from '../../data/stations.js'

export default {
  name: 'selectStation',
  data () {
    return {
      myStations: stations,
      leaveOpacity: '',
    }
  },
  beforeRouteLeave (to, from, next) {
    this.leaveOpacity = 0
    setTimeout(function () {
      next()
    }, 500)
  }
}
</script>