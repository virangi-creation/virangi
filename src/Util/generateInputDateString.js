const generateInputDateString = (paramDate) => {
    return `${paramDate.getFullYear()}-${(
        "00" + parseInt(paramDate.getMonth() + 1)
    ).slice(-2)}-${("00" + parseInt(paramDate.getDate())).slice(-2)}`;
};

export default generateInputDateString;
