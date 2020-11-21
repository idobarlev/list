<template>
    <div class="mb-2">
        <v-btn v-if="IsUserExistInList"
        rounded dark color="green lighten-5 green--text" @click="cancelParticipant">
            Cancel your participation
            <v-icon right>mdi-checkbox-marked-circle</v-icon>
        </v-btn>
        <v-btn v-else rounded dark color="green lighten-5 green--text" @click="newParticipant">
            Join this list!
            <v-icon right>mdi-checkbox-marked-circle</v-icon>
        </v-btn>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    props: ['list', 'uid'], 
     computed: {
        ...mapGetters('usersModule', [
            'getCurUser',
            'IsUserExistInList',
        ]),
    },
    methods : {
        ...mapActions([
            'usersModule/getCurUserFromFirebase',
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