<template>
  <div class="list-lists">
    <div v-if="getUserLists.length == 0">
      <div class="no-lists">
        <h2>No lists yet...</h2>
        <v-divider></v-divider>
        <router-link to="/create-list" v-slot="{ navigate }">
          <v-btn icon @click="navigate" fab color="teal lighten-1">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </router-link>
      </div>
    </div>
    <div v-else v-for="list in getUserLists" :key="list.id">
      <span>
        <ListItem v-bind:list="list" :key="list.id"/>
      </span>
    </div>
  </div>
</template>

<script>
import ListItem from '../components/ListItem/ListItem'
import {mapActions, mapGetters} from 'vuex';

export default {
  components: {
    ListItem
  },
  data : () => ({
  }),
  computed: {
    ...mapGetters('listsModule', [
        'getUserLists',
    ])
  },
  methods: {
    ...mapActions('listsModule',[
        'getListsFromFirebase'
    ])
  },
  created() {
    this.getListsFromFirebase()
  },
};
</script>

<style lang="css" scoped>
.date {
  text-align: right;
}
.no-lists{
  text-align: center;
  margin-top: 14rem;
  margin-right: 13%;
  margin-left: 13%;
}
.no-lists h2{
  color: #26A69A;
}
</style>