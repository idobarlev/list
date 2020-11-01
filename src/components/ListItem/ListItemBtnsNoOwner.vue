<template>
    <span>
        <ListItemBtnModal v-bind:btnInfo="{
              textOnHover : 'Cancel your participant',
              color : 'error',
              icon : 'mdi-cancel',
              listName : 'in ' + list.name,
            }"
            :modalInfo="{
              title : 'Cancel your participant in this list',
              text : `Are you sure you want to cancel your participant in '${list.name}'?`,
            }"
            :modalActionFromParent="cancelParticipant"/>
    </span>
</template>

<script>
import ListItemBtnModal from './ListItemBtnModal'

export default {
    components : {
        ListItemBtnModal
    }, 
    props: ['list', 'uid'], 
    methods : {
        cancelParticipant() {
            console.log(`Soon i'll cancel participant!!!`)
        },
    }
}
</script>

<style lang="scss" scoped>

</style>