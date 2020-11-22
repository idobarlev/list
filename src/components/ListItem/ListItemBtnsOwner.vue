<template>
    <span>
        <ListItemBtnModal v-bind:btnInfo="{
            textOnHover : 'Delete',
            color : 'error',
            icon : 'mdi-delete-outline',
            listName : list.name,
            }"
            :modalInfo="{
                title : 'Delete this list',
                text : `Are you sure you want to delete '${list.name}' list?`,
            }"
            :modalActionFromParent="del"
        />
        <v-btn class="mx-1 mt-1" fab small @click="edit">
          <v-icon color="green"> mdi-pencil-outline </v-icon>
        </v-btn>
    </span>
</template>

<script>
import ListItemBtnModal from './ListItemBtnModal'
import { mapActions } from 'vuex';

export default {
    components : {
        ListItemBtnModal
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