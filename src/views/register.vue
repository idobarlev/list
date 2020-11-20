<template>
  <div class="register">
    <h1>Register</h1>
    <p>Create account</p>
    <v-card flat class="mt-4 mx-5" color="green lighten-5">
    <v-form v-model="valid" @submit.prevent="registerWithEmail">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="10" md="4">
            <v-text-field color="green" v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            <v-text-field color="green" v-model="name" :rules="[rules.required]" label="Name" required></v-text-field>
            <v-text-field
              color="green"
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-hover v-slot="{ hover }">
          <v-btn
          rounded 
          color="green lighten-1"
          dark
          class="mt-2"
          :elevation="hover ? 16 : 2"
          type="submit">Register</v-btn>
        </v-hover>
        <p class="mr-1 mt-4" style="color : #1B5E20">
          Got an account?
          <router-link
          to="/Login"
          v-slot="{ navigate }"
          >
            <a class='link' @click="navigate">Back to login.</a>
          </router-link>
        </p>
      </v-container>
    </v-form>
    </v-card>
  </div>
</template>

<script>
import { auth, usersRef } from '../../firebaseConfig'

export default {
  data: () => ({
    valid: false,
    password: "",
    name: "",
    showPassword: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match"
    },
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  }),
  methods: {
    registerWithEmail() {
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          usersRef.doc(auth.currentUser.uid).set({
                name : this.name,
                email : this.email
          })
          .catch(err => {
            console.error('Error on creating user', err)
          })
        })
        .then(() => {
          console.log("register successfuly! 😁");
          this.$router.replace({ name: "Home" });
        })
        .catch(err => console.error(err));
    }
  }
};
</script>

<style lang="css" scoped>
.register {
  text-align: center;
}
.link{
  color : #2E7D32;
  text-decoration: underline;
}
input, textarea {
    color: green !important;
}
</style>