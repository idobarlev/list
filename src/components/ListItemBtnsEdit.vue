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
</template>

<script>
import ListItemBtn from './ListItemBtn'
import ListItemBtnModal from './ListItemBtnModal'
import {mapActions, mapGetters} from 'vuex';

export default {
    components : {
        ListItemBtn, ListItemBtnModal
    },  
    data: () => ({
    }),
    computed: {
      ...mapGetters([
          'getIsEditList'
      ])
    },
    methods : {
      ...mapActions([
        'actionIsEditList'
      ]),
      save() {
        console.log('Start save:')
        this.actionIsEditList(false)
      },
      discard() {
        this.isEdit = false
      }
    }
}
</script>

<style lang="scss" scoped>

</style>