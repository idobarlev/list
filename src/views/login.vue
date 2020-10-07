<template>
  <div class="login">
    <h1>Login</h1>
    <p>Welcome to list login here to use an exsiting acount 👨‍💻</p>
    <v-form v-model="valid" @submit.prevent="loginWithEmail">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" md="4">
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            <v-text-field
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
        <v-btn type="submit">Login</v-btn>
        <p class="mr-1 mt-4">
          Don't have an acount?
          <a v-on:click="register()">Register now.</a>
        </p>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  data: () => ({
    valid: false,
    password: "",
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
    register() {
      this.$router.replace({ name: "register" });
    },
    loginWithEmail() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log("login successfuly! 😁");
          this.$router.replace({ name: "home" });
        })
        .catch(error => (this.error = error));
    }
  }
};
</script>


<style lang="css" scoped>
.login {
  text-align: center;
}
</style>