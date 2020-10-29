<template>  
  <v-card class="mt-4 mx-5">
    <div v-if="isEdit">
      <ListFields v-bind:list="list"/>
    </div>
    <div v-else>
      <v-card-title v-text="listName"></v-card-title>
      <v-card-subtitle class="date" v-text="list.date"></v-card-subtitle>
    </div>
    <v-card-actions>
        <div v-if="isEdit">
          <ListItemBtnsEdit />
        </div>
        <span v-else>
          <ListItemBtnsNoEdit v-bind:list="list" v-bind:uid="uid"/>
        </span>
    </v-card-actions>
  </v-card>
</template>

<script>
import ListFields from './ListFields'
import ListItemBtnsEdit from './ListItemBtnsEdit'
import ListItemBtnsNoEdit from './ListItemBtnsNoEdit'
import { auth } from '../../firebaseConfig'

export default {
  components : {
    ListFields, ListItemBtnsEdit, ListItemBtnsNoEdit
  },
  props: ['list'],
  data: () => ({
    isEdit : false,
    uid : auth.currentUser.uid,
    listName : ''
  }),
  created() {
    this.listName = this.list.name
  },
  methods : {
    
  }
};
</script>

<style lang="css" scoped>
.date {
  text-align: right;
}
</style>