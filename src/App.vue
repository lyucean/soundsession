<template>
  <!-- Это основной шаблон, который представляет стркутура проекта -->
  <div id="app">
    <transition name="router-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<!-- Это основной набор стилеей, который будут наследовать все компоненты -->
<style>
.router-fade-enter-active, .router-fade-leave-active {
  transition-property: opacity;
  transition-duration: .15s;
}
.router-fade-enter-active {
  transition-delay: .15s;
}
.router-fade-enter, .router-fade-leave-active {
  opacity: 0
}
</style>
<style src="./App.css"></style>
