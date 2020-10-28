<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col cols="10" md="4">
            <v-text-field
                v-model="listName"
                label="Event list name"
                :rules="[rules.required]"
                required
            ></v-text-field>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="10" md="4">
            <v-menu
                v-model="dateMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="computedDateFormatted"
                    label="Event list date"
                    :ruls="[rules.required]"
                    hint="MM/DD/YYYY format"
                    persistent-hint
                    readonly
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker
                v-model="date"
                Event date
                @input="dateMenu = false"
                ></v-date-picker>
            </v-menu>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="10" md="4">
            <v-select
                :items="types"
                v-model="listType"
                :rules="[rules.required]"
                label="List type"
            ></v-select>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: ['list'],
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
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split("-")
      return `${day}/${month}/${year}`;
    },
  },
  created() {

      // Init with props if need to
      if (this.list) {
        this.listName = this.list.name
        this.date = this.list.date
        this.listType = this.list.type
      }
  }
}
</script>

<style lang="scss" scoped>

</style>