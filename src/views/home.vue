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
    ...mapActions([
        'usersModule/getCurUserFromFirebase',
        'listsModule/getListsFromFirebase'
    ]),
  },
  created() {
    this['usersModule/getCurUserFromFirebase']()
    this['listsModule/getListsFromFirebase']()
  },
};
</script>

<style lang="css" scoped>
.home {
  text-align: center;
}
</style>