
export const colorService = {
    loadColors
};

function loadColors(values) {
    const colors = {
        name: 'color', type: 'list', label: 'Colour', operators: ['eq'],
        list: values.map((item) => {
            return { name: item, label: item }
        })

    }

    return colors;
}