<template>  
  <div class="list-item">
    <div v-if="isEdit">
      <ListFields v-bind:list="list"/>
    </div>
    <v-card color="green lighten-5 green--text" flat v-else class="mx-3 pb-1 rounded-card">   
        <h2>{{list.name}}</h2>
        <h3>{{newDate}}</h3>
        <br>
        <p v-show="list.description" class="mx-2 description">{{list.description}}</p>
    </v-card>
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
    },
    share() {
      console.log(this.$router.history.current.fullPath)
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
.rounded-card{
    border-radius:50px;
}
</style>