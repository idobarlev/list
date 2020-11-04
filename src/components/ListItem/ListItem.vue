<template>  
  <div class="list-item">
    <div v-if="isEdit">
      <ListFields v-bind:list="list"/>
    </div>
    <div v-else>
      <h3>{{list.name}}</h3>
      <h6 class="date">{{newDate}}</h6>
    </div>
    <br>
    <div v-if="isEdit">
      <ListItemBtnsEdit @stop-edit="isEditEvent"/>
    </div>
    <span v-else>
      <ListItemBtnsNoEdit @edit="isEditEvent" v-bind:list="list" v-bind:uid="uid"/>
    </span>
  </div>
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
  text-decoration: underline;
  text-decoration-color : #66BB6A;
}
.list-item{
  color : white;
  text-align: center;
}
</style>