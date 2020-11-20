<template>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            class="mx-1 mt-1" fab small 
            v-bind="attrs"
            v-on="on"
            >
                <v-icon color="green"> {{btnInfo.icon}} </v-icon>
            </v-btn>
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