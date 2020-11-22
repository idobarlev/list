<template>
<v-card flat class="mt-4 mx-5" color="green lighten-5">
    <v-container>
        <v-row align="center" justify="center">
            <v-col cols="10" md="4">
            <v-text-field
                v-model="name"
                color="green"
                label="Event list name"
                :rules="[rules.required, rules.nameLenght]"
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
                    v-model="format"
                    color="green"
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
                color="green"
                v-model="date"
                Event date
                @input="dateMenu = false"
                ></v-date-picker>
            </v-menu>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="10" md="4">
            <vue-google-autocomplete
            id="location"
            classname="form-control"
            placeholder="Start typing"
            v-on:placechanged="getLocation"
            v-on:error="handleError"
            >
            </vue-google-autocomplete>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="10" md="4">
            <v-textarea
                v-model="description"
                rows="3"
                color="green"
                label="Description"
                :rules="[rules.descriptionLenght]"
                required
            >
            </v-textarea>
            </v-col>
        </v-row>
        <!-- <v-row align="center" justify="center">
            <v-col cols="10" md="4">
            <v-select
                :items="types"
                v-model="type"
                :rules="[rules.required]"
                label="List type"
            ></v-select>
            </v-col>
        </v-row> -->
    </v-container>
</v-card>
</template>

<script>
import { mapGetters, mapMutations} from 'vuex'
import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
    props: ['list'],
    components: { VueGoogleAutocomplete },
    data: () => ({
      location : {},
      valid: false,
      format : '',
      dateMenu: false,
      types: ["Guests List", "Prodcuts List"],
      rules: {
        required: (value) => !!value || "Field is required.",
        descriptionLenght :value => {
          if (value) {
            return value.length < 100 || "Description is too long."
          }
          return true
        },
        nameLenght : value =>  value && value.length < 30 || "Name is too long."
      },
  }),
  computed: {
    ...mapGetters('listsModule',[
      'getTempList'
    ]),
    name : {
      get () {
        return this.getTempList.name
      },
      set (value) {
        this.setTempListName(value)
        this.setTempListType('Guests List')
      },
    },
    description : {
      get () {
        return this.getTempList.description
      },
      set (value) {
        this.setTempListDescription(value)
      },
    },
    date : {
      get () {
        return this.getTempList.date
      },
      set (value) {
        this.formatDate(value)
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
  mounted() {
  },
  methods: {
    formatDate(value) {
      const curDate = value
      if (!curDate) return null
      const [year, month, day] = curDate.split("-")
      this.format = `${day}/${month}/${year}`
    },
    ...mapMutations('listsModule',[
        'setTempList',
        'setTempListName', 
        'setTempListDate', 
        'setTempListType', 
        'setTempListDescription', 
    ]),
    getLocation(location, placeResultData, id) {
        this.location = location;
        console.log(location);
        console.log(placeResultData);
        console.log(id);
    },
    handleError(error){
      alert(error)
    },
  },
  created() {
    
      // Init with props if need to
      if (this.list) {
        this.formatDate(this.list.date)
        this.setTempList(this.list)
      }
      else { 
        this.formatDate(new Date().toISOString().substr(0, 10))
        this.setTempListDate(new Date().toISOString().substr(0, 10))  
      }
  }
}
</script>

<style lang="scss">
.list-fields{
  color : white;
}
input, textarea {
    color: green !important;
}
</style>