<template>
  <div class="createList">
    <h1>Create new list</h1>
    <v-form @submit.prevent="createList">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" md="4">
            <v-text-field v-model="listName" label="Event list name" required></v-text-field>

            <v-checkbox v-model="isRepeat" :label="`Repeat?`"></v-checkbox>
          </v-col>
        </v-row>
        <div v-show="!isRepeat">
          <v-row align="center" justify="center">
            <v-col cols="12" md="4">
              <v-date-picker v-model="date"></v-date-picker>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="12" md="4">
              <v-text-field v-model="dateText" label="Event date" prepend-icon="mdi-calendar"></v-text-field>
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
              <v-text-field v-model="dateRangeText" label="Date range" prepend-icon="mdi-calendar"></v-text-field>
            </v-col>
          </v-row>
          <b>Repeat every:</b>
          <p>{{repeatDisplay()}}</p>
          <v-row align="center" justify="center">
            <v-col cols="2" md="1">
              <v-text-field type="number" v-model="days" label="Days" required></v-text-field>
            </v-col>
            <v-col cols="2" md="1">
              <v-text-field type="number" v-model="weeks" label="Weeks" required></v-text-field>
            </v-col>
            <v-col cols="2" md="1">
              <v-text-field type="number" v-model="months" label="Months" required></v-text-field>
            </v-col>
            <v-col cols="2" md="1">
              <v-text-field type="number" v-model="years" label="Years" required></v-text-field>
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
    days: 0,
    weeks: 0,
    months: 0,
    years: 0,
    date: new Date().toISOString().substr(0, 10),
    dates: [
      new Date().toISOString().substr(0, 10),
      new Date().toISOString().substr(0, 10)
    ]
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
    }
  },
  methods: {
    createList() {
      console.log(`create some list`);
    },
    repeatDisplay() {
      let repeatStr = "";

      if (this.days > 0) {
        repeatStr += this.days + " Day";

        if (this.days > 1) {
          repeatStr += "s";
        }

        repeatStr += " ";
      }
      if (this.weeks > 0) {
        if (this.months <= 0 && this.years <= 0 && this.days > 0) {
          repeatStr += "and ";
        }

        repeatStr += this.weeks + " Week";

        if (this.weeks > 1) {
          repeatStr += "s";
        }

        repeatStr += " ";
      }
      if (this.months > 0) {
        if (this.years <= 0 && (this.days > 0 || this.weeks > 0)) {
          repeatStr += "and ";
        }
        repeatStr += this.months + " Month";

        if (this.months > 1) {
          repeatStr += "s";
        }

        repeatStr += " ";
      }
      if (this.years > 0) {
        if (this.days > 0 || this.weeks > 0 || this.months > 0) {
          repeatStr += "and ";
        }
        repeatStr += this.years + " Year";

        if (this.years > 1) {
          repeatStr += "s";
        }

        repeatStr += " ";
      }

      return repeatStr;
    }
  }
};
</script>

<style lang="css" scoped>
.createList {
  text-align: center;
}
</style>