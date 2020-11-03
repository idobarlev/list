<template>
  <v-app class="grey lighten-4">
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
  data: () => ({
    //
  }),
  methods: {},
};
</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css?family=Raleway');

html, body {
  font-family: 'Raleway', sans-serif;
  background: #E0F2F1;
}

#app {
  font-family: 'Raleway', sans-serif;
  background: #E0F2F1;
}
</style>
