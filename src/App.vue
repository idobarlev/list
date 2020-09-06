<template>
  <v-app class="grey lighten-4">
    <v-main>
      <navbar></navbar>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import navbar from "./components/navbar";

export default {
  components: { navbar },
  name: "App",
  data: () => ({
    //
  }),
  methods: {},
};
</script>
