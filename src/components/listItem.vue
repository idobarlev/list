<template>
  <div class="list-item">
      <v-card class="mt-4 mx-5">
        <v-card-title v-text="list.name"></v-card-title>
        <v-card-subtitle class="date" v-text="list.date"></v-card-subtitle>
        <v-card-actions>
            <div v-if="list.ownerUid == uid">
                <v-btn class="ma-2" text icon color="orange lighten-2"> 
                    <v-icon dark right> mdi-pencil </v-icon>
                </v-btn>
                <v-btn color="error"> Delete </v-btn>
            </div>
            <div v-else>
                <v-btn color="error"> Cancel Participant </v-btn>
            </div>

        </v-card-actions>
      </v-card>
  </div>
</template>

<script>
import { auth } from '../../firebaseConfig'

export default {
  props: ['list'],
  data: () => ({
    uid : auth.currentUser.uid
  }),
};
</script>

<style lang="css" scoped>
.date {
  text-align: right;
}
</style>