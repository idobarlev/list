<template>
    <v-list-item-group class="d-flex flex-row mb-6">
        <v-list-item-icon>
            <v-icon v-text="'mdi-account'"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>    
            <v-list-item-title v-text="`name: ${participant.name}`"></v-list-item-title>
            <v-list-item-subtitle v-text="`email: ${participant.email}`"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon>
            <v-icon color="green lighten-5">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
    </v-list-item-group>
</template>

<script>
export default {
    props: { 
        participant: {
            type: Object,
            required : true
        },
    },
    data: () => ({
    }),
}
</script>

<style style lang="css" scoped>
    
</style>