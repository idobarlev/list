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
import { mapMutations } from 'vuex';

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
    methods : {
        ...mapMutations([
            'listsModule/setTempList',
            'setIsLoading'
        ]), 
    },
    created () {

        // When create check if prop valid need to get.
        listsRef.doc(this.listId).onSnapshot(snapshot => {
            this.listData = { ...snapshot.data(), id: snapshot.id }
            this['listsModule/setTempList'](this.listData)
            this.setIsLoading(false)
        })
    },
}
</script>

<style lang="scss" scoped>
</style>