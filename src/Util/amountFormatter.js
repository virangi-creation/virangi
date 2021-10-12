const hindiNumberFormatter = new Intl.NumberFormat("en-IN");

const amountFormatter = (number, range) => {
    return hindiNumberFormatter.format(parseFloat(number).toFixed(range));
};

export default amountFormatter;
