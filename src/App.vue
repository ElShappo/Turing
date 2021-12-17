<template>
  <div class="">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- {{createTuring("S0 A B R S1").program}} -->
    <MT @v-bind="program='S0 a b R S1', word='hello, world!'"/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Turing from './turing.js'
import MT from './components/Turing.vue'

export default {
  name: 'App',
  components: {
    MT,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
