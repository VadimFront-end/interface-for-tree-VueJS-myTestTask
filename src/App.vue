<template>
  <div id="app">
    <tree/>
  </div>
</template>

<script>
import tree from './components/tree'
export default {
  name: 'App',
  components: {
    tree
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
