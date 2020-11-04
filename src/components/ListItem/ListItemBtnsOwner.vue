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
            :modalActionFromParent="del"
        />
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
import { mapActions } from 'vuex';

export default {
    components : {
        ListItemBtn, ListItemBtnModal
    }, 
    props: ['list', 'uid'], 
    methods : {
        ...mapActions('listsModule',[
            'deleteList'
        ]),
        del() {
            this.deleteList(this.list.id)
            this.$router.replace({ name: "Home" });
        },
        edit() {
            this.$emit('edit', true)
        },
    }
}
</script>

<style lang="scss" scoped>

</style>