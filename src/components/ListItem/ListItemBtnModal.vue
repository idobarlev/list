<template>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-hover v-slot="{ hover }">
                <span v-if="hover" transition="fade-transition">
                    <v-btn
                    :color="btnInfo.color"
                    small
                    :elevation="hover ? 16 : 2"
                    v-bind="attrs"
                    v-on="on">
                        {{btnInfo.textOnHover}}
                        <v-icon right> {{btnInfo.icon}} </v-icon>
                    </v-btn>
                </span>
                <span v-else transition="fade-transition">
                    <v-btn
                    :color="btnInfo.color"
                    fab
                    small
                    :elevation="hover ? 16 : 2"
                    v-bind="attrs" v-on="on">
                        <v-icon> {{btnInfo.icon}} </v-icon>
                    </v-btn>                
                </span>
            </v-hover>
        </template>
        <v-card>
            <v-card-title class="headline">
                {{modalInfo.title}}
            </v-card-title> 
            <v-card-text>
                 {{modalInfo.text}}
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
            <v-spacer></v-spacer>
                <v-hover v-slot="{ hover }">
                    <v-btn
                        color="primary"
                        small
                        :elevation="hover ? 16 : 2"
                        @click="dialog = false">
                           discard
                    </v-btn>                
                </v-hover>
                <v-hover v-slot="{ hover }">
                    <v-btn
                        :color="btnInfo.color"
                        small
                        :elevation="hover ? 16 : 2"
                        @click="modalAction">
                            {{btnInfo.textOnHover}}
                            <v-icon right> {{btnInfo.icon}} </v-icon>
                    </v-btn>                
                </v-hover>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        btnInfo : Object,
        modalInfo : Object,
        modalActionFromParent : Function
    },
    data : () => ({
        dialog : false,
    }),
    methods : {
        modalAction() {
            this.modalActionFromParent()
            this.dialog = false
        },
    }   
}
</script>

<style>

</style>