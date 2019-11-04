<template>
  <div class="player" :style="setVarCSS">
    <div class="stations-title">{{ title }}</div>
    <div class="stations-genres">{{ genres }}</div>
    <div class="button-block">

      <div class="wrapper-button">
        <div class="button-pause" v-if="playStatus" v-on:click="pause"></div>
        <div class="button-play" v-else v-on:click="play"></div>
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
    <audio :src="urlSource" class="player-audio" controls id="player-audio" preload="auto" ref="audio"></audio>
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
        path: station.path, //
        urlSource: station.urlSource,
        urlTrackName: station.urlTrackName,
        stationBackgroundColor: station.colorBackground, // цвет фон станции
        stationTextColor: station.colorText, // цвет текста станции
        volume: 75, // уровень звука
        playStatus: false, // статус плеера
        playReady: true, // готов ли плеер к командам и обрабатывает предыдущую
        buttonsDisplay: false, // флаг скрытия элементов
        mouseHideWait: null, // таймер скрытия элементов экрана
        mouseHideWaitPeriod: 5, // Период таймера скрытия элементов экрана
        timerLoadingTrackName: null, // таймер загрузки названия трека
        timerLoadingTrackNamePeriod: 3, // Период таймера загрузки названия трека
        isMobile: null, // примитивное оперделение устройства
        audio: undefined, // тут будет наш <audio>
        loading: true, // анимация ожидания загрузки
      }
    },
    watch: {
      volume () {
        this.audio.volume = this.volume / 100
      }
    },
    methods: {
      play () {
        this.audio.volume = this.volume / 100
        this.playStatus = this.buttonsDisplay = true

        // нужен промис, инече, если поставить на паузу плеер, кода он ещё не заигра, выпадет ошибка
        if (this.playReady) {
          this.playReady = false
          this.audio.play().then(_ => {
            this.playReady = true
          })
        }
      },
      pause () {
        if (this.playReady) {
          this.audio.pause()
          this.playStatus = this.buttonsDisplay = false
        }
      },
      volumeUp () {
        if (this.playStatus && this.volume < 100) {
          this.volume++
        }
      },
      volumeDown () {
        if (this.playStatus && 0 < this.volume) {
          this.volume--
        }
      },
      // Обработать движение мышью.
      onMouseMove () {
        // Если плеер запущен и элементы скрыты
        if (this.playStatus) {
          // Показываем элементы управления.
          this.buttonsDisplay = true

          // Запускаем таймер на скрытие элемнтов, если это не мобильный
          if (!this.isMobile) {
            // Всегда очищаем предыдущий таймер при вызове метода.
            clearTimeout(this.mouseHideWait)
            // Запускаем новый отсчет.
            this.mouseHideWait = setTimeout(() => {
              // Скрыть элементы управления.
              this.buttonsDisplay = false
            }, this.mouseHideWaitPeriod * 1000)
          }
        }
      },
    },
    mounted: function () {
      this.track_name = 'Loading...'
      this.track_author = 'station'
      // свяжем контейнер с переменной.
      this.audio = document.getElementById('player-audio')

      // Запускаем обновление название трека каждые 5 секунд.
      this.timerLoadingTrackName = setInterval(() => {

        // подгрузка или вывод ошибок
        this.axios.get(this.urlTrackName).then((response) => {
          this.track_name = response.data[0].title
          this.track_author = response.data[0].artist
        }).finally(() => (this.loading = false))

      }, this.timerLoadingTrackNamePeriod * 1000)

    },
    beforeDestroy () {
      clearTimeout(this.timerLoadingTrackName) // очистим обновление трека
    },
    computed: {
      setVarCSS () {
        return {
          '--station-color-background': this.stationTextColor,
          '--station-color-text': this.stationBackgroundColor,
        }
      },
    },
    created: function () {
      // В родителе емитим события
      this.$parent.$on('onMouseMove', this.onMouseMove)
      this.$parent.$on('volumeUp', this.volumeUp)
      this.$parent.$on('volumeDown', this.volumeDown)
      this.$parent.$on('play', this.play)

      // вешаем собыите на опредление мобильного, всё что ниже 700 - мобильный
      this.isMobile = document.documentElement.clientWidth < 700
    }
  }
</script>

