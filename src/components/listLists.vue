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
      <h2>My Lists</h2> 
      <v-card 
      class="mt-3 mx-1 rounded-card"
      color="green lighten-5"
      dark 
      flat
      @click="info(list)"
      v-for="list in getUserLists" :key="list.id">
          <v-card-title class="justify-center green--text">
            {{list.name}}
          </v-card-title>
          <v-card-subtitle class="justify-center green--text">{{list.date}}</v-card-subtitle>
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
    ]),
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
.list-lists {
  color : white;
}
.no-lists{
  text-align: center;
  margin-top: 14rem;
  margin-right: 13%;
  margin-left: 13%;
}
.rounded-card{
    border-radius:50px;
}
.card-center {
  text-align: center;
}
.text-color {
  color: #1B5E20;
}
</style>