const dateStringDB = (paramDate) => {
    paramDate = new Date(paramDate.substr(0, 10));
    return `${paramDate.getDate()}/${(
        "00" + parseInt(paramDate.getMonth() + 1)
    ).slice(-2)}/${paramDate.getFullYear()}`;
};

export default dateStringDB;
