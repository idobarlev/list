<template>
  <span>
    <v-toolbar color="light-green accent-4" dark flat>
      <div v-show="loggedIn">
        <router-link
        to="/create-list"
        v-slot="{ navigate }"
        >
          <v-btn icon @click="navigate">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <router-link
      to="/"
      v-slot="{ navigate }"
      >
      <v-btn class="" text>
          <img @click="navigate"
          src='../assets/logo.png'
          height="30"/>
      </v-btn>
      </router-link>
      <v-spacer></v-spacer>

      <div v-show="loggedIn">
        <v-btn icon @click="signOut">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    <span v-show="getIsLoading">
      <v-progress-linear indeterminate color="green lighten-4"></v-progress-linear>
    </span>
  </span>
</template>

<script>
import { auth } from '../../firebaseConfig'
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      is_transparent: true,
      loggedIn: false
    };
  },
  computed :{
    ...mapGetters([
        'getIsLoading'
    ])
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
    },
    onScroll(e) {
      this.is_transparent = !(e.target.scrollTop > 0);
    },
  }
};
</script>

<style lang="css" scoped>
</style>