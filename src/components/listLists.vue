<template>
  <div class="list-lists">
    <div v-if="lists.length == 0">
      <h1>You don't have events yet...</h1>
    </div>
    <div v-else v-for="list in lists" :key="list.id">
      <span>
        <ListItem v-bind:list="list" />
      </span>
    </div>
  </div>
</template>

<script>
import ListItem from '../components/ListItem'
import { listsRef } from '../../firebaseConfig'

export default {
  components: {
    ListItem
  },
  data: () => ({
    lists : []
  }),
  created() {

    // Real time listener for lists.
    listsRef.onSnapshot(snapshot => {
      const changes = snapshot.docChanges();
      changes.forEach(list => {
        if (list.type === 'added') {
          this.lists.push({
            ...list.doc.data(),
            id: list.doc.id
          })
        } else if (list.type === 'removed') {

          // get index of object with id: list.doc.id
          var removeIndex = this.lists.map(list => list.id).indexOf(list.doc.id);

          // remove object
          this.lists.splice(removeIndex, 1);
        }
      })
    })
  },
  mounted() {
  },
};
</script>

<style lang="css" scoped>
.date {
  text-align: right;
}
</style>