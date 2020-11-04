<template>
    <div>
        <span v-if="list.ownerUid == uid">
            <ListItemBtnsOwner @edit="editEvent" v-bind:list="list" v-bind:uid="uid"/>
        </span>
        <span v-else>
            <ListItemBtnsNoOwner v-bind:list="list" v-bind:uid="uid"/>
        </span>
    </div>
</template>

<script>
import ListItemBtnsOwner from './ListItemBtnsOwner'
import ListItemBtnsNoOwner from './ListItemBtnsNoOwner'

export default {
    components : {
        ListItemBtnsOwner, ListItemBtnsNoOwner
    }, 
    props: ['list', 'uid'], 
    data: () => ({
    }),
    methods : {
        editEvent() {
            this.$emit('edit', true)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>