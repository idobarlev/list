<template>
    <v-row justify="center" cols="12">
        <v-col>
            <span v-if="list.ownerUid == uid">
                <ListItemBtnsOwner @edit="editEvent" v-bind:list="list" v-bind:uid="uid"/>
            </span>
            <span v-else>
                <ListItemBtnsNoOwner v-bind:list="list" v-bind:uid="uid"/>
            </span>
            <ShareNetwork
            network="WhatsApp"
            :title="'⭐You are invited to: ' + this.list.name +'\n📆 On the: ' + this.list.date + '\n'"
            :url="this.curUrl"
            >
                <v-btn class="mx-1 mt-1" fab small>
                    <v-icon color="green"> mdi-whatsapp </v-icon>
                </v-btn>
            </ShareNetwork>
            <v-btn class="mx-1 mt-1" fab small
            v-clipboard:copy="curUrl"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">
            <v-icon color="green"> mdi-content-copy </v-icon>
            </v-btn>
            <v-snackbar v-model="snackbar"
            rounded="pill" 
            :timeout="timeout"
            color="white green--text">
                {{ copyMsg }}
                <template v-slot:action="{ attrs }">
                    <v-btn
                    color="green"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                    >
                    X
                    </v-btn>
                </template>
            </v-snackbar>
            <AddToCalendar
            :buttonText="'Add'"
            :title="formatTitle"
            :details="list.description"
            :startTime="formatDate"
            :endTime="formatDate"/>
        </v-col>
    </v-row>
</template>

<script>
import AddToCalendar from '../AddToCalendar';
import ListItemBtnsOwner from './ListItemBtnsOwner'
import ListItemBtnsNoOwner from './ListItemBtnsNoOwner'

export default {
    components : {
        ListItemBtnsOwner, ListItemBtnsNoOwner, AddToCalendar
    }, 
    props: ['list', 'uid'], 
    data: () => ({
        snackbar: false,
        wi : 10,
        timeout: 2000,
        curUrl : window.location.href,
        copyMsg : "",
    }),
    computed : {
        formatDate() {
            if(!this.list.date) {
                return new Date()
            }
            const [year, month, day] = this.list.date.split("-")
            return new Date(`${month}/${day}/${year} 12:00:00`)
        },
        formatTitle() {
            if(!this.list.name) {
                return ''
            }
            return this.list.name
        },
    },
    methods : {
        editEvent() {
            this.$emit('edit', true)
        },
        onCopy() {
            this.snackbar = true
            this.copyMsg = 'Copied!'
            console.log(this.copyMsg)
        },
        onError() {
            this.snackbar = true
            this.copyMsg = 'Error try again please'
        }
    }
}
</script>

<style lang="css" scoped>
</style>