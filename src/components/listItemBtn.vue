<template>
    <v-hover v-slot="{ hover }">
        <span v-if="hover" transition="fade-transition">
            <v-btn
            :color="btnInfo.color"
            small
            @click="btnActionFromParent()"
            :elevation="hover ? 16 : 2">
                {{btnInfo.textOnHover}}
                <v-icon right> {{btnInfo.icon}} </v-icon>
            </v-btn>
        </span>
        <span v-else transition="fade-transition">
            <v-btn
            :color="btnInfo.color"
            fab
            small
            @click="btnActionFromParent()"
            :elevation="hover ? 16 : 2">
                <v-icon> {{btnInfo.icon}} </v-icon>
            </v-btn>                
        </span>
    </v-hover>
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