<template>
  <div class="list-lists">
    <v-progress-linear v-show="getIsLoading" indeterminate color="cyan"></v-progress-linear>
    <div v-if="getUserLists.length == 0">
      <h1>No lists yet...</h1>
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
    isLoading : true
  }),
  computed: {
    ...mapGetters('listsModule',[
        'getUserLists',
        'getIsLoading'
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
</style>