<template>
  <div class="select-station">
    <div class="select-station__close">
      <router-link to="/" class="select-station__close-link">
        <img class="select-station__close-icon"
             src="../../assets/selector_station_close.svg">
        </router-link>
    </div>

    <transition-group class="select-station__grid" tag="div">
     <div class="station" v-for="item in items" v-bind:key="item.title"
          v-bind:style="{ background: item.colorBackground, opacity: item.opacity }">
       <router-link to="/" class="station__link">
         <div class="station_wrap" v-bind:style="{color: item.colorText}">
           <div class="station__title">{{item.title}}</div>
           <div class="station__genres">{{item.genres}}</div>
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
  name: 'selectStation.vue',
  data () {
    return {
      items: stations.map(function (el) {
        // нам нужно добавить свойство прозарчности в массв для каждого элемента
        el['opacity'] = 0
        return el
      }),
      appear_delay: 50, // время задержки перед появлением
    }
  },
  mounted: function () {
    let self = this
    this.items.forEach(function (item, i) {
      setTimeout(() => item.opacity = .8, self.appear_delay * i)
    })
  },
  beforeRouteLeave (to, from, next) {
    let self = this
    this.items.forEach(function (item, i) {
      setTimeout(function () {
        item.opacity = 0
        if (i + 1 === self.items.length) {
          next()
        }
      }, self.appear_delay * i)
    })
  },
}
</script>