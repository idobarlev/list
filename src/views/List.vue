<template>
    <div class="list mt-2">
        <ListItem v-bind:list="listData"/>
        <ListParticipants v-bind:participants="listData.participants"/>
    </div>
</template>

<script>
import ListItem from '../components/ListItem/ListItem'
import ListParticipants from '../components/ListParticipants'
import { listsRef } from '../../firebaseConfig'

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
        }
    },
    data: () => ({
        listData : {},
    }),
    created () {

        // When create check if prop valid need to get.
        if( !this.list ) {
            listsRef.doc(this.listId).onSnapshot(snapshot => {
                this.listData = snapshot.data()
            })
        } else {
            this.listData = this.list
        }
    },
}
</script>

<style lang="scss" scoped>
</style>