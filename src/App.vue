<template>
  <v-app>
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
