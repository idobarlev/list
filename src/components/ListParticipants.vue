<template>
    <v-card class="mt-4 mx-5" color="green lighten-1" flat dark>
        <div v-if="!participants || participants.length == 0">
            <v-card-title v-text="'No participants yet...'"></v-card-title>
        </div>
        <div v-else>
            <v-card-title class="headline" v-text="'Participants'"></v-card-title>
            <v-list color="green lighten-1" v-for="participant in participants" :key="participant.id">
                <Participant v-bind:participant="participant"/>
                <v-divider></v-divider>
            </v-list>
        </div>
    </v-card>
</template>

<script>
import Participant from '../components/Participant'

export default {
    components: {
        Participant
    },
    props: { 
        participants: {
            type: Array,
        },
    }
}
</script>

<style style lang="css" scoped>

</style>