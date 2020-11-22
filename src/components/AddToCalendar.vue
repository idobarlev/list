<template>
  <v-btn class="mx-1 mt-1" fab small>
    <v-icon color="green" @click="addToCalendar"> mdi-calendar </v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    buttonText: { type: String, default: "Add to calendar" },
    details: { type: String },
    endTime: { type: Date, required: true },
    location: { type: String },
    startTime: { type: Date, required: true },
    title: { type: String, required: true },
  },
  data() {
    return {
      googleCalendarLink: null
    }
  },
  methods: {
    addToCalendar() {
      console.log(this.startTime)
      console.log(this.endTime)
      if(!this.startTime) return console.warn("prop: startTime is required");
      if(!this.endTime) return console.warn("prop: endTime is required");
      if(!this.title) return console.warn("prop: title is required");
      this.googleCalendarLink = `http://www.google.com/calendar/event?action=TEMPLATE&text=${this.title || ""}&dates=${this.formatDate(this.startTime)}/${this.formatDate(this.endTime)}&details=${this.details || ""}&location=${this.location || ""}`
      window.open(this.googleCalendarLink, '_blank');
    },
    formatDate(date) {
      const day = date.getDate();
      const monthIndex = date.getMonth();
      const year = date.getFullYear();

      const hour = date.getHours();
      const minutes = date.getMinutes();

      let formatted_date;
      if(hour === 0 && minutes === 0) {
        formatted_date = ("" + year) + this.zero_pad2(monthIndex + 1) + this.zero_pad2(day);
      } else {
        formatted_date = ("" + year) + this.zero_pad2(monthIndex + 1) + this.zero_pad2(day) + "T" + this.zero_pad2(hour) + this.zero_pad2(minutes) + "00Z";
      }

      return formatted_date;
    },
    zero_pad2(num) {
      if(num < 10) return "0" + num;
        return num;
    }
  }
}
</script>

<style scoped>
</style>
