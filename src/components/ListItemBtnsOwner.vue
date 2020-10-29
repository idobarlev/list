<template>
    <span>
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
</template>

<script>
import ListItemBtn from './ListItemBtn'
import ListItemBtnModal from './ListItemBtnModal'
import { listsRef } from '../../firebaseConfig'
import {mapActions, mapGetters} from 'vuex';

export default {
    components : {
        ListItemBtn, ListItemBtnModal
    }, 
    props: ['list', 'uid'], 
    computed: {
      ...mapGetters([
          'getIsEditList'
      ])
    },
    methods : {
        ...mapActions([
            'actionIsEditList'
        ]),
        deleteItem() {
            listsRef.doc(this.list.id).delete()
            .then(() => {
                return this.list.id
            })
            .catch(err => console.error(err))
        },
        edit() {
            this.isEdit = true
        },
    }
}
</script>

<style lang="scss" scoped>

</style>