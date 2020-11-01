<template>
  <div class="home">
    <ListLists />
  </div>
</template>

<script>
import ListLists from "../components/ListLists";

export default {
  components: {
    ListLists,
  },
};
</script>

<style lang="css" scoped>
.home {
  text-align: center;
}
</style>