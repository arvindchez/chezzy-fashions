import momentTimezone from "moment-timezone"

export const formatCurrency = (num) => {
    return Number(parseFloat(num).toFixed(1)).toLocaleString() + ` ${process.env.REACT_APP_PAYMENT_CURRENCY} `;
}

export const convertToAppDate = date => {
    return momentTimezone(date).tz(process.env.REACT_APP_TIME_ZONE).format("MM-DD-YYYY");
}


export const px2vw = (size, width = 1440) => `${(size / width) * 100}vw`;
