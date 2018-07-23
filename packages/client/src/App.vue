<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
}
</script>

<template>
  <div id="app">
    <h1>Demo</h1>
    <router-view/>
  </div>
</template>
