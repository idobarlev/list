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
          <ListItemBtnModal v-bind:btnInfo="{
            textOnHover : 'Cancel changes',
            color : 'error',
            icon : 'mdi-cancel',
            listName : list.name,
          }"
          :modalInfo="{
            title : 'Cancel changes',
            text : `Are you sure you want to cancel changes?`,
          }"
          :modalActionFromParent="discard"/>
          <ListItemBtn 
            class="ml-2"                   
            v-bind:btnInfo="{
              textOnHover : 'Save',
              color : 'success',
              icon : 'mdi-check',
            }"
            :btnActionFromParent="save"
          />
        </div>
        <span v-else>
          <span v-if="list.ownerUid == uid">
            <ListItemBtnModal v-bind:btnInfo="{
              textOnHover : 'Delete',
              color : 'error',
              icon : 'mdi-delete',
              listName : list.name,
            }"
            :modalInfo="{
              title : 'Delete this list',
              text : `Are you sure you want to delete '${list.name}' list?`,
            }"
            :modalActionFromParent="deleteItem"/>
            <ListItemBtn 
              class="ml-2"                   
              v-bind:btnInfo="{
                textOnHover : 'Edit',
                color : 'warning',
                icon : 'mdi-pencil',
              }"
              :btnActionFromParent="edit"
            />
          </span>
          <span v-else>
            <ListItemBtnModal v-bind:btnInfo="{
              textOnHover : 'Cancel your participant',
              color : 'error',
              icon : 'mdi-cancel',
              listName : 'in ' + list.name,
            }"
            :modalInfo="{
              title : 'Cancel your participant in this list',
              text : `Are you sure you want to cancel your participant in '${list.name}'?`,
            }"
            :modalActionFromParent="cancelParticipant"/>
          </span>
          <ListItemBtn class="ma-2"
            v-bind:btnInfo="{
            textOnHover : 'Info',
            color : 'primary',
            icon : 'mdi-information-outline',
          }"
          :btnActionFromParent="info"/>
        </span>
    </v-card-actions>
  </v-card>
</template>

<script>
import ListItemBtn from './ListItemBtn'
import ListItemBtnModal from './ListItemBtnModal'
import ListFields from './ListFields'
import { auth, listsRef } from '../../firebaseConfig'

export default {
  components : {
    ListItemBtn, ListItemBtnModal, ListFields
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
    deleteItem() {
      listsRef.doc(this.list.id).delete()
      .then(() => {
        return this.list.id
      })
      .catch(err => console.error(err))
    },
    cancelParticipant() {
      console.log(`Soon i'll cancel participant!!!`)
    },
    edit() {
      this.isEdit = true
    },
    info() {
      this.$router.replace({ name: 'List', params: { listId: this.list.id, list : this.list}});
    },
    save() {
      console.log('Start save:')
      this.isEdit = false
    },
    discard() {
      this.isEdit = false
    }
  }
};
</script>

<style lang="css" scoped>
.date {
  text-align: right;
}
</style>