<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col cols="10" md="4">
            <v-text-field
                v-model="name"
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
                    hint="DD/MM/YYYY format"
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
                v-model="type"
                :rules="[rules.required]"
                label="List type"
            ></v-select>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapMutations} from 'vuex';

export default {
    props: ['list'],
    data: () => ({
      valid: false,
      dateMenu: false,
      types: ["Guests List", "Prodcuts List"],
      rules: {
        required: (value) => !!value || "Field is required.",
      },
  }),
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.getTempList.date);
    },
    isValid() {
      return this.name != "" && this.type != ""
    },
    ...mapGetters([
      'getTempList'
    ]),
    name : {
      get () {
        return this.getTempList.name
      },
      set (value) {
        this.setTempListName(value)
      },
    },
    date : {
      get () {
        return this.getTempList.date
      },
      set (value) {
        this.setTempListDate(value)
      },
    },
    type : {
      get () {
        return this.getTempList.type
      },
      set (value) {
        this.setTempListType(value)
      },
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split("-")
      return `${day}/${month}/${year}`;
    },
    ...mapMutations([
        'setTempList',
        'setTempListName', 
        'setTempListDate', 
        'setTempListType', 
    ]),
  },
  created() {
    
      // Init with props if need to
      if (this.list) {
        this.setTempList(this.list)
      }
      else { 
        this.setTempListDate(new Date().toISOString().substr(0, 10))  
      }
  }
}
</script>

<style lang="scss" scoped>

</style>