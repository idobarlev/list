export default {
    computed : {
        newDate : function() {
            let curDate = new Date().toISOString().substr(0, 10) 
            if (this.list) {
                curDate = this.list.date
            }
            if (!curDate) {
                return null
            }
            const [year, month, day] = curDate.split("-")
            return `${day}/${month}/${year}`
        },
    },
}