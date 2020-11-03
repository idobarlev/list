<template>
  <div class="list-lists">
    <div v-if="getUserLists.length == 0">
      <h1>You don't have events yet...</h1>
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
  computed: {
    ...mapGetters('listsModule',[
        'getUserLists'
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
  mounted() {
    this.$forceUpdate();
  }
};
</script>

<style lang="css" scoped>
.date {
  text-align: right;
}
</style>