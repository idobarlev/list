<template>
  <div class="createList">
    <h1>Create new list</h1>
    <v-form @submit.prevent="createList">
      <ListFields v-bind:list="list"/>
      <v-hover v-slot="{ hover }">
        <v-btn rounded color="primary"
        :elevation="hover ? 16 : 2"
        type="submit">
          Create
        </v-btn>
      </v-hover>
    </v-form>
  </div>
</template>

<script>
import {auth, listsRef, timeStamp} from '../../firebaseConfig'
import ListFields from '../components/ListFields'

export default {
  components : {
    ListFields
  },  
  data: () => ({
    valid: false,
    listName: "",
    date: new Date().toISOString().substr(0, 10),
    dateMenu: false,
    types: ["Guests List", "Prodcuts List"],
    listType: "",
    rules: {
      required: (value) => !!value || "Field is required.",
    },
  }),
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    isValid() {
      return this.listName != "" && this.listType != ""
    },
  },
  methods: {
    createList() {
      
      if (!this.isValid) {
        return console.log("Fill all fields correctly!");
      }

      listsRef.add({
        createdAt: timeStamp,
        ownerUid: auth.currentUser.uid,
        name: this.listName,
        date: this.date,
        type: this.listType,
      })
      .then(() => {
        this.$router.replace({ name: "Home" })
      })
      .catch((err) => {
        alert('Error occurred on creating event')
        console.error(err)
      })
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split("-")
      return `${day}/${month}/${year}`;
    },
    
  },
};
</script>

<style lang="css" scoped>
.createList {
  text-align: center;
}
</style>