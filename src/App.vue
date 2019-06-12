<template>
  <div id="app">
    Hello
    <CellAuto />
  </div>
</template>

<script>
import CellAuto from './components/cell-auto'
export default {
  name: 'App',
  components: {
    CellAuto
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
