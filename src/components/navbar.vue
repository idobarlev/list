<template>
  <v-toolbar dark>
    <router-link
    to="/"
    v-slot="{ navigate }"
    >
      <v-toolbar-title @click="navigate">list</v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>

    <div v-show="loggedIn">
      <router-link
      to="/create-list"
      v-slot="{ navigate }"
      >
        <v-btn icon @click="navigate">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </router-link>
      <v-btn icon @click="signOut">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </div>
  </v-toolbar>
</template>

<script>
import { auth } from '../../firebaseConfig'

export default {
  data() {
    return {
      loggedIn: false
    };
  },
  mounted() {
    this.setupFirebase();
  },
  methods: {
    signOut() {
      auth
        .signOut()
        .then(() => {
          this.$router.replace({ name: "Login" });
        });
    },
    setupFirebase() {
      auth.onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          this.loggedIn = true;
        } else {
          // No user is signed in.
          this.loggedIn = false;
        }
      });
    }
  }
};
</script>

<style lang="css" scoped>
</style>