<template>
  <div class="home">
    <listLists />
  </div>
</template>

<script>
import listLists from "../components/listLists";

export default {
  components: {
    listLists,
  },
  data: () => ({
    //
  }),
};
</script>

<style lang="css" scoped>
.home {
  text-align: center;
}
</style>