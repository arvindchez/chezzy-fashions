const momentTimezone = require('moment-timezone')

// Function to convert UTC JS Date object to a Moment.js object in configured app time zone
const convertToAppDate = date => {
    return momentTimezone(date, "MM-DD-YYYY").tz(process.env.TIME_ZONE)
}

module.exports = { convertToAppDate }