<template>
  <v-app :style="{ backgroundImage: createBackgroundString }">
    <v-main>
      <Navbar />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  components: { Navbar },
  name: "App",
  data() {
    return {
      angle: '50',
      color1: '#4CAF50',
      color2: '#64DD17'
    }
  },
  computed: {
    createBackgroundString() {
      return `linear-gradient(${this.angle}deg, ${this.color1}, ${this.color2})`;
    }
  },
};
</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css?family=Cabin');

html, body {
  font-family: 'Cabin';
  background: #4CAF50;
  color : white;
}

#app {
  font-family: 'Cabin';
  background: #4CAF50;
  color : white;
}
</style>
