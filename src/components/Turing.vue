<template lang="html">

  <div class="">

  </div>

</template>

<script>

import {Turing} from "../core/turing.js"
export default {

  name: 'MT',
  data: function() {
    return {
      machine: new Turing(this.program),
    };
  },
  methods: {
    setWord(word) {
      this.machine.setWord(word);
    }
  },
  props: {
    program: String,
    word: String,
  }

}
</script>

<style lang="css" scoped>
</style>
