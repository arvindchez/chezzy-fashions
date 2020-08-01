
export const sizeService = {
    loadSizes
};

function loadSizes(values) {
    const sizes = {
        name: 'size', type: 'list', label: 'Size', operators: ['eq'],
        list: values.map((item) => {
            return { name: item, label: item }
        })
    }

    return sizes;
}