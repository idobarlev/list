<template>
  <div class="list-item">
      <v-card class="mt-4 mx-5">
        <v-card-title v-text="list.name"></v-card-title>
        <v-card-subtitle class="date" v-text="list.date"></v-card-subtitle>
        <v-card-actions>
            <div v-if="list.ownerUid == uid">
              <ListItemBtnModal v-bind:btnInfo="{
                textOnHover : 'Delete',
                color : 'error',
                icon : 'mdi-delete',
                listName : list.name,
                modal : {
                  title : 'Delete this list',
                  text : `Are you sure you want to delete '${list.name}' list?`
                }
              }"/>
              <ListItemBtn class="ma-2" v-bind:btnInfo="{
                textOnHover : 'Edit',
                color : 'warning',
                icon : 'mdi-pencil',
              }"/>
            </div>
            <div v-else>
              <ListItemBtnModal v-bind:btnInfo="{
                textOnHover : 'Cancel your participant',
                color : 'error',
                icon : 'mdi-cancel',
                listName : 'in ' + list.name,
                modal : {
                  title : 'Cancel your participant in this list',
                  text : `Are you sure you want to cancel your participant in '${list.name}'?`
                }
              }"/>
            </div>
        </v-card-actions>
      </v-card>
  </div>
</template>

<script>
import ListItemBtn from './ListItemBtn'
import ListItemBtnModal from './ListItemBtnModal'
import { auth } from '../../firebaseConfig'

export default {
  components : {
    ListItemBtn, ListItemBtnModal
  },
  props: ['list'],
  data: () => ({
    uid : auth.currentUser.uid,
  }),
};
</script>

<style lang="css" scoped>
.date {
  text-align: right;
}
</style>