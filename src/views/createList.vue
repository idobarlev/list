<template>
  <div class="createList">
    <h1>Create new list</h1>
    <v-form @submit.prevent="createList">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" md="4">
            <v-text-field
              v-model="listName"
              label="Event list name"
              :rules="listNameRules"
              required
            ></v-text-field>

            <v-checkbox v-model="isRepeat" :label="`Repeat?`"></v-checkbox>
          </v-col>
        </v-row>
        <div v-show="!isRepeat">
          <v-row align="center" justify="center">
            <v-col cols="8" md="4">
              <v-date-picker v-model="date"></v-date-picker>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="12" md="4">
              <v-text-field
                v-model="dateText"
                label="Event date"
                prepend-icon="mdi-calendar"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
        <div v-show="isRepeat">
          <v-row align="center" justify="center">
            <v-col cols="12" md="4">
              <v-date-picker v-model="dates" range></v-date-picker>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="12" md="4">
              <v-text-field
                v-model="dateRangeText"
                label="Date range"
                prepend-icon="mdi-calendar"
              ></v-text-field>
            </v-col>
          </v-row>
          <b>Repeat every:</b>
          <p>{{ repeatDisplay() }}</p>
          <v-row align="center" justify="center">
            <v-col cols="3" md="1">
              <v-text-field
                type="number"
                v-model="repeat.days"
                label="Days"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="3" md="1">
              <v-text-field
                type="number"
                v-model="repeat.weeks"
                label="Weeks"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="3" md="1">
              <v-text-field
                type="number"
                v-model="repeat.months"
                label="Months"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="3" md="1">
              <v-text-field
                type="number"
                v-model="repeat.years"
                label="Years"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
        <v-btn type="submit">Create</v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    listName: "",
    isRepeat: false,
    repeat: {
      days: 0,
      weeks: 0,
      months: 0,
      years: 0,
    },
    date: new Date().toISOString().substr(0, 10),
    dates: [
      new Date().toISOString().substr(0, 10),
      new Date().toISOString().substr(0, 10),
    ],
    listNameRules: [(v) => !!v || "List name is rqeuired"],
  }),
  computed: {
    dateRangeText() {
      let [year, month, day] = "";
      let fromFormated = "";
      let toFormated = "";

      if (this.dates[0]) {
        [year, month, day] = this.dates[0].split("-");
        fromFormated = `${day}/${month}/${year}`;
      }

      if (this.dates[1]) {
        [year, month, day] = this.dates[1].split("-");
        toFormated = `${day}/${month}/${year}`;
      }

      return "From date: " + fromFormated + " - Until: " + toFormated;
    },
    dateText() {
      let [year, month, day] = "";

      if (this.date) {
        [year, month, day] = this.date.split("-");
      }

      return `${day}/${month}/${year}`;
    },
  },
  methods: {
    createList() {
      console.log(`create some list`);
      let dates = "";

      if (this.isRepeat) {
        dates = this.dates;
      } else {
        dates = this.date;
      }

      let listData = {
        listName: this.listName,
        isRepeat: this.isRepeat,
        dates: dates,
        repeat: this.repeat,
      };

      console.log(listData);
    },
    repeatDisplay() {
      let repeatStr = "";

      if (this.repeat.days > 0) {
        repeatStr += this.repeat.days + " Day";

        if (this.repeat.days > 1) {
          repeatStr += "s";
        }

        repeatStr += " ";
      }
      if (this.repeat.weeks > 0) {
        if (
          this.repeat.months <= 0 &&
          this.repeat.years <= 0 &&
          this.repeat.days > 0
        ) {
          repeatStr += "and ";
        }

        repeatStr += this.repeat.weeks + " Week";

        if (this.repeat.weeks > 1) {
          repeatStr += "s";
        }

        repeatStr += " ";
      }
      if (this.repeat.months > 0) {
        if (
          this.repeat.years <= 0 &&
          (this.repeat.days > 0 || this.repeat.weeks > 0)
        ) {
          repeatStr += "and ";
        }
        repeatStr += this.repeat.months + " Month";

        if (this.repeat.months > 1) {
          repeatStr += "s";
        }

        repeatStr += " ";
      }
      if (this.repeat.years > 0) {
        if (
          this.repeat.days > 0 ||
          this.repeat.weeks > 0 ||
          this.repeat.months > 0
        ) {
          repeatStr += "and ";
        }
        repeatStr += this.repeat.years + " Year";

        if (this.repeat.years > 1) {
          repeatStr += "s";
        }

        repeatStr += " ";
      }

      return repeatStr;
    },
  },
};
</script>

<style lang="css" scoped>
.createList {
  text-align: center;
}
</style>