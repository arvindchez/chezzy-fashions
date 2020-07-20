const momentTimezone = require('moment-timezone')

// Function to convert UTC JS Date object to a Moment.js object in configured app time zone
const convertToAppDate = date => {
    return momentTimezone(date, "MM-DD-YYYY").tz(process.env.TIME_ZONE)
}

const formatCurrency = (num) => {
    return Number(parseFloat(num).toFixed(1)).toLocaleString() + "Ft ";
}


module.exports = { convertToAppDate, formatCurrency }