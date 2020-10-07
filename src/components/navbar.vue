<template>
  <div class="v-toolbar">
    <v-toolbar dark>
      <v-toolbar-title>list</v-toolbar-title>
      <v-spacer></v-spacer>

      <div v-show="loggedIn">
        <v-btn icon @click="createList">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn icon @click="signOut">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

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
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "login" });
        });
    },
    createList() {},
    setupFirebase() {
      firebase.auth().onAuthStateChanged(user => {
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