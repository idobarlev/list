<template>
    <v-btn
    icon 
    color="white"
    @click="btnActionFromParent()"
    >
        <v-icon> {{btnInfo.icon}} </v-icon>
    </v-btn>
</template>

<script>
export default {
    props: {
        btnInfo : Object,
        btnActionFromParent : Function
    },
    data : () => ({
    }),
}
</script>

<style>

</style>