<template>
  <div class="player">
    <div class="stations-title">{{ title }}</div>
    <div class="stations-genres">{{ genres }}</div>
    <div class="button-block">
        <div v-if="play" v-on:click="playPause" class="button-play-pause">
             <svg width="60" height="68" viewBox="0 0 60 68" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M57.5 29.6699C60.8333 31.5944 60.8333 36.4056 57.5 38.3301L8 66.909C4.66666 68.8335 0.500003 66.4278 0.500003 62.5788L0.500001 5.42115C0.5 1.57215 4.66667 -0.833465 8 1.09104L57.5 29.6699Z"
                  :fill="fill"></path>
             </svg>
        </div>
        <div v-else v-on:click="playPause" class="button-play-pause">
          <svg width="52" height="68" viewBox="0 0 52 60" xmlns="http://www.w3.org/2000/svg">
              <rect width="20" height="60" rx="6" :fill="fill"></rect>
              <rect x="32" width="20" height="60" rx="6" :fill="fill"></rect>
          </svg>
        </div>
      <div class="button-previous">
        <svg width="32" height="20" viewBox="0 0 32 20" :fill="fill" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 12.5981C14.5 11.4434 14.5 8.55662 16.5 7.40192L27 1.33975C29 0.185044 31.5 1.62842 31.5 3.93782L31.5 16.0622C31.5 18.3716 29 19.815 27 18.6603L16.5 12.5981Z"/>
            <path d="M1.5 12.5981C-0.500002 11.4434 -0.500001 8.55662 1.5 7.40192L12 1.33975C14 0.185044 16.5 1.62842 16.5 3.93782L16.5 16.0622C16.5 18.3716 14 19.815 12 18.6603L1.5 12.5981Z"/>
        </svg>
      </div>
      <div class="button-next">
        <svg width="32" height="20" viewBox="0 0 32 20" :fill="fill" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 7.40192C17.5 8.55663 17.5 11.4434 15.5 12.5981L5 18.6603C3 19.815 0.500001 18.3716 0.500001 16.0622L0.5 3.93782C0.5 1.62842 3 0.185046 5 1.33975L15.5 7.40192Z"/>
            <path d="M30.5 7.40192C32.5 8.55663 32.5 11.4434 30.5 12.5981L20 18.6603C18 19.815 15.5 18.3716 15.5 16.0622L15.5 3.93782C15.5 1.62842 18 0.185046 20 1.33975L30.5 7.40192Z"/>
        </svg>
      </div>
      <div class="button-volume">
       <svg width="29" height="21" viewBox="0 0 29 21" :fill="fill" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.829 0.911781C13.1057 0.641877 13.5756 0.836687 13.5756 1.22086V10.4215V10.5772V19.7789C13.5756 20.1642 13.1057 20.359 12.829 20.088L6.65329 15.2602C6.61925 15.2265 6.57424 15.209 6.52703 15.209H2.46699C1.10449 15.209 0 14.1142 0 12.7636V8.30474C0 6.95196 1.10669 5.85602 2.47028 5.85602H6.46445C6.51056 5.85602 6.55667 5.83643 6.58961 5.80487L12.829 0.911781ZM18.5469 4.19851C20.4737 5.73086 21.5782 8.03266 21.5782 10.514C21.5782 12.9747 20.488 15.2645 18.5886 16.798C18.4459 16.9134 18.2735 16.9699 18.1033 16.9699C17.8793 16.9699 17.6576 16.8731 17.5061 16.687C17.2382 16.3594 17.2876 15.8784 17.6169 15.6128C19.1562 14.371 20.0389 12.5133 20.0389 10.514C20.0389 8.49955 19.1441 6.6309 17.5851 5.38913C17.2535 5.12576 17.1997 4.64581 17.4654 4.31605C17.7311 3.98628 18.2153 3.93296 18.5469 4.19851ZM24.0331 0.16737C27.1896 2.68139 29 6.45677 29 10.5249C29 14.5604 27.2137 18.3162 24.099 20.8291C23.9562 20.9434 23.785 21 23.6137 21C23.3908 21 23.1679 20.9031 23.0164 20.717C22.7485 20.3905 22.799 19.9095 23.1284 19.644C25.882 17.4227 27.4618 14.0979 27.4618 10.5249C27.4618 6.92149 25.8611 3.58143 23.0702 1.36017C22.7387 1.09571 22.6849 0.615758 22.9506 0.285997C23.2163 -0.0426755 23.7004 -0.0960032 24.0331 0.16737Z"/>
        </svg>
      </div>
      <label class="volume-progress-bar">
          <input type="range" v-model="volume" min="1" max="100" :style="{background:fill}">
      </label>
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
        fill: station.colorText,
        volume: 75,
        play: false,
      }
    },
    methods: {
      playPause: function () {
        if (this.play) {
          this.play = false
        } else {
          this.play = true
        }
      }
    },
    mounted: function () {
      console.log(this.station)
      this.track_name = 'The Right Thing'
      this.track_author = 'Moby'
    },
  }
</script>

