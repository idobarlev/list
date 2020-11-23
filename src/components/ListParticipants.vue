<template>
    <div class="mt-3">
        <div v-if="!participants || participants.length == 0">
            <v-card color="green lighten-5 green--text" flat class="mx-3 mb-1 pb-1 rounded-card">   
                <v-card-title v-text="'No participants yet...'"></v-card-title>
            </v-card>
        </div>
        <div v-else>
            <v-card color="green lighten-5 green--text" flat class="mx-3 mb-1 pb-1 rounded-card">   
                <h2 class="pt-1">Participants</h2>
            </v-card>
            <v-list class="mx-3" color="green lighten-5 green--text" v-for="participant in participants" :key="participant.id">
                <Participant v-bind:participant="participant"
                :isOwner="isOwner"
                :listOwnerId="ownerUid"/>
                <v-divider></v-divider>
            </v-list>
        </div>
    </div>
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
.rounded-card{
    border-radius:50px;
    text-align: center;
}
</style>