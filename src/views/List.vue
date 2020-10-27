<template>
    <div class="list mt-2">
        <ListItem v-bind:list="list"/>
        <ListParticipants v-bind:participants="list.participants"/>
    </div>
</template>

<script>
import ListItem from '../components/ListItem'
import ListParticipants from '../components/ListParticipants'

export default {
    components : {
        ListItem,
        ListParticipants
    },
    props: { 
        listId: {
            type: String,
            required: true,
        },
        list: {
            type: Object,
            required: true,
        }
    },
    data: () => ({
    }),
}
</script>

<style lang="scss" scoped>
.list {

}
</style>