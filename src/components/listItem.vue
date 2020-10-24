<template>
  <div class="list-item">
      <v-card class="mt-4 mx-5">
        <v-card-title v-text="list.name"></v-card-title>
        <v-card-subtitle class="date" v-text="list.date"></v-card-subtitle>
        <v-card-actions>
            <div v-if="list.ownerUid == uid">
              <listItemBtn v-bind:btnInfo="{
                textOnHover : 'Delete',
                color : 'error',
                icon : 'mdi-delete'
              }"/>
              <listItemBtn class="ma-2" v-bind:btnInfo="{
                textOnHover : 'Edit',
                color : 'warning',
                icon : 'mdi-pencil'
              }"/>
            </div>
            <div v-else>
              <listItemBtn v-bind:btnInfo="{
                textOnHover : 'Cancel your participant',
                color : 'error',
                icon : 'mdi-cancel'
              }"/>
            </div>

        </v-card-actions>
      </v-card>
  </div>
</template>

<script>
import listItemBtn from './listItemBtn'
import { auth } from '../../firebaseConfig'

export default {
  components : {
    listItemBtn,
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