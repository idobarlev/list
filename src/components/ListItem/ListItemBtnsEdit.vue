<template>
    <div>
        <ListItemBtnModal v-bind:btnInfo="{
            textOnHover : 'Cancel changes',
            color : 'error',
            icon : 'mdi-cancel',
            listName : '',
          }"
          :modalInfo="{
            title : 'Cancel changes',
            text : `Are you sure you want to cancel changes?`,
          }"
          :modalActionFromParent="discard"/>
        <v-btn class="mx-1 mt-1" fab small @click="save">
          <v-icon color="green"> mdi-check </v-icon>
        </v-btn>
    </div>
</template>

<script>
import ListItemBtnModal from './ListItemBtnModal'
import { mapActions } from 'vuex';

export default {
    components : {
      ListItemBtnModal
    },  
    data: () => ({
    }),
    methods : {
      ...mapActions('listsModule',[
        'updateList',
        'isValid'
      ]),  
      save() {
        this.isValid().then(res => {
          if (res) {
            this.updateList()
            this.$emit('stop-edit', false)
          }
        })
      },
      discard() {
        this.$emit('stop-edit', false)
      }
    }
}
</script>

<style lang="scss" scoped>

</style>