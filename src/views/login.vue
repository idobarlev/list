<template>
  <div class="login">
    <h1>Login</h1>
    <p>Welcome to list login here to use an exsiting acount</p>
    <v-form v-model="valid" @submit.prevent="loginWithEmail">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="10" md="4">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
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
        <v-hover v-slot="{ hover }">
          <v-btn rounded color="primary"
          :elevation="hover ? 16 : 2"
          type="submit">Login</v-btn>
        </v-hover>
        <p class="mr-1 mt-4">
          Don't have an account?
          <router-link
          to="/register"
          v-slot="{ navigate }"
          >
            <a @click="navigate">Register now.</a>
          </router-link>
        </p>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { auth } from '../../firebaseConfig'

export default {
  data: () => ({
    valid: false,
    password: "",
    showPassword: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match",
    },
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
  methods: {
    loginWithEmail() {
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log('login successfuly! 😁');
          this.$router.replace({ name: 'Home' });
        })
        .catch(err => console.error(err));
    },
  },
};
</script>


<style lang="css" scoped>
.login {
  text-align: center;
}
</style>