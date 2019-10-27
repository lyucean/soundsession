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
        <div v-if="buttonsDisplay" class="wrapper-animation">
          <!--          <div class="button-previous"></div>-->
          <!--          <div class="button-next"></div>-->
          <div class="wrapper-volume">
            <div class="volume-button"></div>
            <label class="volume-progress-bar">
              <input max="100" min="1" type="range" v-model="volume">
            </label>
          </div>
        </div>
      </transition>
    </div>

    <div class="track-name">{{ track_name }}</div>
    <div class="track-author">{{ track_author }}</div>
    <div class="timeline"></div>
    <audio :src="stationSource" class="player-audio" controls id="player-audio" preload="auto" ref="audio"></audio>
  </div>
</template>

<style src="./player.css" scoped></style>

<script>
  export default {
    name: 'player',
    props: ['data'],
    data () {
      const station = this.data.station;
      return {
        genres: station.genres,
        track_name: '',
        track_author: '',
        title: station.title,
        stationSource: station.stationSource,
        stationBackgroundColor: station.colorBackground, // цвет фон станции
        stationTextColor: station.colorText, // цвет текста станции
        volume: 75, // уровень звука
        play: false, // статус плеера
        buttonsDisplay: false, // флаг скрытия элементов
        mouseWait: null, // таймер скрытия элементов экрана
        isMobile: null, // примитивное оперделение устройства
        player: undefined, // тут будет наш <audio>
      };
    },
    watch: {
      volume () {
        this.player.volume = this.volume / 100;
      }
    },
    methods: {
      playPause () {
        if (this.play) {
          this.play = this.buttonsDisplay = false;
          this.player.pause();
        } else {

          this.player.volume = this.volume / 100;
          let promise = this.player.play();

          if (promise !== undefined) {
            promise.then(_ => {
              this.play = this.buttonsDisplay = true;
            });
          }
        }
      },
      // Обработать движение мышью.
      onMouseMove () {
        // Если полный экран.
        if (this.play) {
          // Показываем элементы управления.
          this.buttonsDisplay = true;

          // Запускаем таймер, если это не мобильный
          if (!this.isMobile) {
            this.runTiming();
          }
        }
      },
      // Запустить таймер.
      runTiming () {
        // Всегда очищаем предыдущий таймер при вызове метода.
        clearTimeout(this.mouseWait);
        // Запускаем новый отсчет.
        this.mouseWait = setTimeout(() => {
          // Скрыть элементы управления.
          this.buttonsDisplay = false;
        }, 5000);
      },
    },
    mounted () {
      this.track_name = 'The Right Thing';
      this.track_author = 'Moby';
      // свяжем контейнер с переменной.
      this.player = document.getElementById('player-audio');

      // попробуем сразу запустить плеер
      this.playPause();
    },
    computed: {
      setVarCSS () {
        return {
          '--station-color-background': this.stationTextColor,
          '--station-color-text': this.stationBackgroundColor,
        };
      },
    },
    created: function () {
      // В родителе емитим это событие
      this.$parent.$on('onMouseMove', this.onMouseMove);

      // вешаем собыите на опредление мобильного, всё что ниже 700 - мобильный
      this.isMobile = document.documentElement.clientWidth > 700;
    }
  };
</script>

