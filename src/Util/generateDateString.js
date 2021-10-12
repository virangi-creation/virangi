const generateDateString = (paramDate) => {
    return `${paramDate.getDate()}/${(
        "00" + parseInt(paramDate.getMonth() + 1)
    ).slice(-2)}/${paramDate.getFullYear()}`;
};

export default generateDateString;
