import momentTimezone from "moment-timezone"

export const formatCurrency = (num) => {
    return Number(parseFloat(num).toFixed(1)).toLocaleString() + ` ${process.env.REACT_APP_PAYMENT_CURRENCY} `;
}

export const convertToAppDate = date => {
    return momentTimezone(date).tz(process.env.REACT_APP_TIME_ZONE).format("MM-DD-YYYY");
}

export const convertToObject = (url) => {
    const arr = url.slice(1).split(/&|=/); // remove the "?", "&" and "="
    let params = {};

    for (let i = 0; i < arr.length; i += 2) {
        const key = arr[i], value = arr[i + 1];
        params[key] = value; // build the object = { limit: "10", page:"1", status:"APPROVED" }
    }
    return params;
};

export const px2vw = (size, width = 1440) => `${(size / width) * 100}vw`;
