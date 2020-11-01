<template>
    <div>
        <span v-if="list.ownerUid == uid">
            <ListItemBtnsOwner @edit="editEvent" v-bind:list="list" v-bind:uid="uid"/>
        </span>
        <span v-else>
            <ListItemBtnsNoOwner v-bind:list="list" v-bind:uid="uid"/>
        </span>
        <ListItemBtn class="ma-2"
            v-bind:btnInfo="{
            textOnHover : 'Info',
            color : 'primary',
            icon : 'mdi-information-outline',
          }"
        :btnActionFromParent="info"/>
    </div>
</template>

<script>
import ListItemBtn from './ListItemBtn'
import ListItemBtnsOwner from './ListItemBtnsOwner'
import ListItemBtnsNoOwner from './ListItemBtnsNoOwner'

export default {
    components : {
        ListItemBtn, ListItemBtnsOwner, ListItemBtnsNoOwner
    }, 
    props: ['list', 'uid'], 
    data: () => ({
    }),
    methods : {
        info() {
            this.$router.replace({ name: 'List', params: { listId: this.list.id, list : this.list}})
        },
        editEvent() {
            this.$emit('edit', true)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>