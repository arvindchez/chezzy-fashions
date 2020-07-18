export const formatCurrency = (num) => {
    return Number(parseFloat(num).toFixed(1)).toLocaleString() + " Ft ";
}

export const px2vw = (size, width = 1440) => `${(size / width) * 100}vw`;
