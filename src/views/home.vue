<template>
  <div class="home">
    <ListLists />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ListLists from "../components/ListLists";

export default {
  components: {
    ListLists,
  },
  methods: {
    ...mapActions('usersModule',[
        'getCurUserFromFirebase',
    ]),
  },
  created() {
    this.getCurUserFromFirebase()
  },
};
</script>

<style lang="css" scoped>
.home {
  text-align: center;
}
</style>