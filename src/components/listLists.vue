<template>
  <div class="list-lists">
    <div v-if="getUserLists.length == 0">
      <div class="no-lists">
        <h2>No lists yet...</h2>
        <v-divider></v-divider>
        <router-link to="/create-list" v-slot="{ navigate }">
          <v-btn icon @click="navigate" fab color="white">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </router-link>
      </div>
    </div>
    <div v-else>
      <h3 class="my-lists-header">my lists</h3> 
      <v-card 
      class="mt-1 mx-1"
      color="green lighten-1"
      dark 
      flat
      @click="info(list)"
      v-for="list in getUserLists" :key="list.id">
          <v-card-title>
            {{list.name}}
            <v-spacer></v-spacer>            
            {{list.date}}
          </v-card-title>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import dateMixin from '../mixins/formatDateMixin'

export default {
  computed: {
    ...mapGetters('listsModule', [
        'getUserLists',
    ])
  },
  methods: {
    info(list) {
      this.$router.replace({ name: 'List', params: { listId: list.id, list}})
    },
  },
  mixins : [dateMixin]
};
</script>

<style lang="css" scoped>
.my-lists-header {
  text-decoration: underline;
  text-decoration-color : #66BB6A;
}
.list-lists {
  color : white;
}
.no-lists{
  text-align: center;
  margin-top: 14rem;
  margin-right: 13%;
  margin-left: 13%;
}
</style>