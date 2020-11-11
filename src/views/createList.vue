<template>
  <div class="createList">
    <h3>create new list</h3>
    <v-form @submit.prevent="create">
      <ListFields />
      <v-hover v-slot="{ hover }">
        <v-btn rounded color="green lighten-1"
        dark
        class="mt-2"
        :elevation="hover ? 16 : 2"
        type="submit">
          create
        </v-btn>
      </v-hover>
    </v-form>
  </div>
</template>

<script>
import ListFields from '../components/ListFields'
import { mapActions } from 'vuex';

export default {
  components : {
    ListFields
  },  
  methods: {
    ...mapActions('listsModule',[
      'createList'
    ]),
    create() {
      this.createList().then(() => {
        this.$router.replace({ name: "Home" });
      })
    }
  }
};
</script>

<style lang="css" scoped>
.createList {
  color : white;
  text-align: center;
}
</style>