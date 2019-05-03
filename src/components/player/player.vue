<template>
  <div class="player">
    <div class="stations-title">{{ title }}</div>
    <div class="stations-genres">{{ genres }}</div>
    <div class="button-block">
      <div class="button-play-pause" >
        <img src="./player_play.svg" v-if="play" v-on:click="playPause">
        <img src="./player_pause.svg" v-else v-on:click="playPause">
      </div>
      <div class="button-previous">
        <img src="./player_previous.svg">
      </div>
      <div class="button-next">
        <img src="./player_next.svg">
      </div>
      <div class="button-volume">
        <img src="./player_volume.svg">
      </div>
      <div class="volume-progress-bar">
        <input type="range" v-model="volume" min="1" max="100">
      </div>
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
    data () {
      return {
        title: 'All sound',
        genres: 'From POP before RAP',
        track_name: 'Sounds from the ground',
        track_author: 'Lean on me',
        volume: 75,
        play: false,
      }
    },
    methods: {
      playPause: function () {
        if(this.play) {
          this.play = false
        }else{
          this.play = true
        }
      }
    }
  }
</script>

