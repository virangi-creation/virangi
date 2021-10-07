const generateAddressString = (lineone, linetwo, city, state, pincode) => {
    return lineone + ", " + linetwo + ", " + city + " - " + pincode;
};

export default generateAddressString;
