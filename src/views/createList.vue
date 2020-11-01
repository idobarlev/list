<template>
  <div class="createList">
    <h1>Create new list</h1>
    <v-form @submit.prevent="create">
      <ListFields />
      <v-hover v-slot="{ hover }">
        <v-btn rounded color="primary"
        :elevation="hover ? 16 : 2"
        type="submit">
          Create
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
    ...mapActions([
      'createList'
    ]),
    create() {
      this.createList()
      this.$router.replace({ name: "Home" });
    }
  }
};
</script>

<style lang="css" scoped>
.createList {
  text-align: center;
}
</style>