<template>
  <div class="createList">
    <h3>create new list</h3>
    <v-form ref="form" @submit.prevent="create">
      <ListFields />
      <v-hover v-slot="{ hover }">
        <v-btn rounded
        dark
        color="green lighten-5 green--text"
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
import { mapActions, mapMutations } from 'vuex';

export default {
  components : {
    ListFields
  },  
  data: () => ({
  }),
  methods: {
    ...mapActions('listsModule',[
      'createList',
      'isValid'
    ]),
    ...mapMutations('listsModule',[
        'setTempList',
    ]),
    create() {
      this.$refs.form.validate()
      this.isValid().then(res => {
        if (res) {
          this.createList().then(() => {
            this.$router.replace({ name: "Home" });
          })
        }
      })
    }
  },
  created() {
    this.setTempList({})
  }
};
</script>

<style lang="css" scoped>
.createList {
  color : white;
  text-align: center;
}
</style>