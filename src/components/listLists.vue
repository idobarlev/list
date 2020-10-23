<template>
  <div class="list-lists">
    <div v-if="lists.length == 0">
      <h1>You don't have events yet... 😥</h1>
    </div>
    <div v-else v-for="list in lists" :key="list.name">
      <listItem v-bind:list="list"/>
    </div>
  </div>
</template>

<script>
import listItem from '../components/listItem'
import { listsRef } from '../../firebaseConfig'

export default {
  components: {
    listItem
  },
  data: () => ({
    lists : []
  }),
  mounted() {

    // Get all user's lists, saves on lists array.
    listsRef.get()
    .then(snapshot => {
      snapshot.forEach(list => {
        this.lists.push(list.data())
      })
    })
    .catch(err => {
      console.error(err)
    })
  },
};
</script>

<style lang="css" scoped>
.date {
  text-align: right;
}
</style>