<template>
    <span>
        <v-btn v-if="this['usersModule/IsUserExistInList']() == true"
        rounded dark color="green lighten-1" @click="cancelParticipant">
            Cancel your participant
            <v-icon right>mdi-checkbox-marked-circle</v-icon>
        </v-btn>
        <v-btn v-else rounded dark color="green lighten-1" @click="newParticipant">
            Join this list!
            <v-icon right>mdi-checkbox-marked-circle</v-icon>
        </v-btn>
    </span>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    props: ['list', 'uid'], 
     computed: {
        ...mapGetters('usersModule', [
            'getCurUser',
        ])
    },
    methods : {
        ...mapActions([
            'usersModule/getCurUserFromFirebase',
            'usersModule/IsUserExistInList',
            'listsModule/addParticipant',
            'listsModule/deleteParticipant',
        ]),
        cancelParticipant() {
            this['listsModule/deleteParticipant']()
        },
        newParticipant() {
            this['listsModule/addParticipant']()
        }
    },
    created() {
        if (!this.getCurUser.id) {
            this['usersModule/getCurUserFromFirebase']()
        }
    },
}
</script>

<style lang="scss" scoped>

</style>