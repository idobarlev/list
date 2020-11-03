<template>  
  <v-card class="mt-4 mx-5" color="teal lighten-4">
    <div v-if="isEdit">
      <ListFields v-bind:list="list"/>
    </div>
    <div v-else>
      <v-card-title v-text="list.name"></v-card-title>
      <v-card-subtitle class="date" v-text="newDate"></v-card-subtitle>
    </div>
    <v-card-actions>
        <div v-if="isEdit">
          <ListItemBtnsEdit @stop-edit="isEditEvent"/>
        </div>
        <span v-else>
          <ListItemBtnsNoEdit @edit="isEditEvent" v-bind:list="list" v-bind:uid="uid"/>
        </span>
    </v-card-actions>
  </v-card>
</template>

<script>
import ListFields from '../ListFields'
import ListItemBtnsEdit from './ListItemBtnsEdit'
import ListItemBtnsNoEdit from './ListItemBtnsNoEdit'
import dateMixin from '../../mixins/formatDateMixin'
import { auth } from '../../../firebaseConfig'

export default {
  components : {
    ListFields, ListItemBtnsEdit, ListItemBtnsNoEdit
  },
  props: ['list'],
  data: () => ({
    isEdit : false,
    uid : auth.currentUser.uid,
  }),
  methods : {
    isEditEvent(value) {
      this.isEdit = value
    }
  },
  mixins : [dateMixin]
};
</script>

<style lang="css" scoped>
.date {
  text-align: right;
}
</style>