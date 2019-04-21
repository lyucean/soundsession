<template>
  <!-- Это основной шаблон, который представляет стркутура проекта -->
  <div id="app">
      <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<!-- Это основной набор стилеей, который будут наследовать все компоненты -->
<style src="./App.css"></style>
