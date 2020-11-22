<template>
    <v-list-item-group class="d-flex flex-row mb-6">
        <!-- TODO -- ADD PHOTO
             <v-list-item-icon>
            <v-icon v-text="'mdi-account'"></v-icon>
        </v-list-item-icon> -->
        <v-list-item-content class="mx-2">    
            <v-list-item-title v-text="`name: ${participant.name}`"></v-list-item-title>
            <v-list-item-subtitle v-text="`email: ${participant.email}`"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon v-if="isOwner && participant.id !== listOwnerId">
            <v-icon color="green" @click="deleteParticipantById(participant.id)"> mdi-minus-circle-outline</v-icon>
          </v-btn>
        </v-list-item-action>
    </v-list-item-group>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props: { 
        participant: {
            type: Object,
            required : true
        },
        isOwner : {
            type : Boolean
        },
        listOwnerId : {
            type : String
        }
    },
    methods : {
        ...mapActions('listsModule',[
            'deleteParticipantById'
        ]),
    }
}
</script>

<style style lang="css" scoped>
    
</style>