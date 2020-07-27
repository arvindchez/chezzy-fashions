const momentTimezone = require('moment-timezone')

const convertToAppDate = date => {
    return momentTimezone(date).tz(process.env.TIME_ZONE).format("MM-DD-YYYY");
}

const formatCurrency = (num) => {
    return Number(parseFloat(num).toFixed(1)).toLocaleString() + ` ${process.env.PAYMENT_CURRENCY} `;
}

module.exports = { convertToAppDate, formatCurrency }