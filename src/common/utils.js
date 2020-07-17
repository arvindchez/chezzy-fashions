const momentTimezone = require('moment-timezone')

// Function to convert UTC JS Date object to a Moment.js object in configured app time zone
const convertToAppDate = date => {
    return momentTimezone(date, "MM-DD-YYYY").tz(process.env.TIME_ZONE)
}

const getUnique = (items, value) => {
    let type = [...new Set(items.map(item => item[value]))]
    type = new Set(type.flat(1))
    return ['All', ...type]
}

module.exports = { convertToAppDate, getUnique }