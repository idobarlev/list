<template>
    <v-card class="mt-4 mx-3" color="green lighten-5 green--text" flat>
        <div v-if="!participants || participants.length == 0">
            <v-card-title v-text="'No participants yet...'"></v-card-title>
        </div>
        <div v-else>
            <v-card-title v-text="'Participants'"></v-card-title>
            <v-list color="green lighten-5 green--text" v-for="participant in participants" :key="participant.id">
                <Participant v-bind:participant="participant"
                :isOwner="isOwner"
                :listOwnerId="ownerUid"/>
                <v-divider></v-divider>
            </v-list>
        </div>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import Participant from '../components/Participant'

export default {
    components: {
        Participant
    },
    props: { 
        participants: {
            type: Array,
        },
    },
    computed : {
        ...mapGetters([
            'listsModule/getTempList',
            'usersModule/getCurUser',
        ]),
        isOwner : {
            get() {
                return (this['listsModule/getTempList'].ownerUid === 
                        this['usersModule/getCurUser'].id)
            }
        },
        ownerUid : {
            get() {
                return (this['listsModule/getTempList'].ownerUid) 
            }
        }
    }
}
</script>

<style style lang="css" scoped>

</style>