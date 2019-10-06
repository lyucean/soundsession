<template>
  <div class="player" :style="setVarCSS">
    <div class="stations-title">{{ title }}</div>
    <div class="stations-genres">{{ genres }}</div>
    <div class="button-block">

      <div class="wrapper-button">
        <div v-if="play" v-on:click="playPause" class="button-pause"></div>
        <div v-else v-on:click="playPause" class="button-play"></div>
      </div>

      <transition name="slide-fade">
        <div v-if="play" class="wrapper-animation">
          <div class="button-previous"></div>
          <div class="button-next"></div>
          <div class="button-volume"></div>
          <label class="volume-progress-bar">
            <input type="range" v-model="volume" min="1" max="100">
          </label>
        </div>
      </transition>
    </div>

    <div class="track-name">{{ track_name }}</div>
    <div class="track-author">{{ track_author }}</div>
    <div class="timeline"></div>
  </div>
</template>

<style src="./player.css" scoped></style>

<script>
  export default {
    name: 'player',
    props: ['data'],
    data () {
      const station = this.data.station
      return {
        genres: station.genres,
        track_name: '',
        track_author: '',
        title: station.title,
        stationBackgroundColor: station.colorBackground,
        stationTextColor: station.colorText,
        volume: 75,
        play: false,
      }
    },
    methods: {
      playPause: function () {
        this.play = !this.play
      }
    },
    mounted: function () {
      this.track_name = 'The Right Thing'
      this.track_author = 'Moby'
    },
    computed: {
      setVarCSS () {
        return {
          '--station-color-background': this.stationTextColor,
          '--station-color-text': this.stationBackgroundColor,
        }
      }
    }
  }
</script>

