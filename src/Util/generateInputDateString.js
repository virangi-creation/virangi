const generateInputDateString = (paramDate) => {
    return `${paramDate.getFullYear()}-${(
        "00" + parseInt(paramDate.getMonth() + 1)
    ).slice(-2)}-${paramDate.getDate()}`;
};

export default generateInputDateString;
