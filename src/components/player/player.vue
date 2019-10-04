<template>
  <div class="player"  :style="cssPlayer">
    <div class="stations-title">{{ title }}</div>
    <div class="stations-genres">{{ genres }}</div>
    <div class="button-block">
      <div v-if="play" v-on:click="playPause" class="button-play">
        <div class="button-play__button" :style="{backgroundColor:stationTextColor}"></div>
      </div>
      <div v-else v-on:click="playPause" class="button-pause">
        <div class="button-pause__button" :style="{backgroundColor:stationTextColor}"></div>
      </div>
      <!--      <div class="button-previous">-->
      <!--        <img src="./player_previous.svg" alt>-->
      <!--      </div>-->
      <!--      <div class="button-next">-->
      <!--        <img src="./player_next.svg" alt>-->
      <!--      </div>-->
      <!--      <div class="button-volume">-->
      <!--        <img src="./player_volume.svg" alt>-->
      <!--      </div>-->
      <!--      <label class="volume-progress-bar">-->
      <!--        <input type="range" v-model="volume" min="1" max="100" :style="{background:fill}">-->
      <!--      </label>-->
    </div>
    <div class="track-name" >{{ track_name }}</div>
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
      cssPlayer() { return {
        '--player-selection-background': this.stationTextColor,
        '--player-selection-text': this.stationBackgroundColor,
      }
      }
    }
  }
</script>

