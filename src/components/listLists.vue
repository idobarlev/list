<template>
  <div class="list-lists">
    <div v-if="userLists.length == 0">
      <h1>You don't have events yet...</h1>
    </div>
    <div v-else v-for="list in userLists" :key="list.id">
      <span>
        <ListItem v-bind:list="list" />
      </span>
    </div>
  </div>
</template>

<script>
import ListItem from '../components/ListItem'
import {mapActions, mapGetters} from 'vuex';

export default {
  components: {
    ListItem
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters([
        'userLists'
    ])
  },
  methods: {
    ...mapActions([
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