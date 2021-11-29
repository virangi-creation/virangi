function eleID(str) {
    return document.getElementById(str).value;
}

export const onDateChange = () => {
    var days = parseInt(document.getElementById("paymentdays").value);
    console.log(days);
    var invoicedate = document.getElementById("invoicedate").value;
    var date = new Date(invoicedate.valueOf());
    console.log(invoicedate);
    date.setDate(date.getDate() + days);
    var template = date.toISOString().substr(0, 10);
    console.log(template);
    document.getElementById("duedate").value = template;
};

const updateAmount = () => {
    var quantitymtr = parseFloat(eleID("quantitymtr"));
    var rate = parseFloat(eleID("rate"));
    var vatavper = parseFloat(eleID("vatavper"));
    var gst = parseFloat(eleID("gst"));
    var price = rate * (1 - vatavper / 100) * (1 + gst / 100);
    var amount = quantitymtr * rate;
    var vatavamount = (amount * vatavper) / 100;
    var adjustedamount = amount - vatavamount;
    var cgstamount = (adjustedamount * gst) / 200;
    var sgstamount = (adjustedamount * gst) / 200;
    var totalamount = adjustedamount + cgstamount + sgstamount;
    document.getElementById("price").value = price.toFixed(2);
    document.getElementById("amount").value = amount.toFixed(2);
    document.getElementById("vatavamount").value = vatavamount.toFixed(2);
    document.getElementById("adjustedamount").value = adjustedamount.toFixed(2);
    document.getElementById("cgstamount").value = cgstamount.toFixed(2);
    document.getElementById("sgstamount").value = sgstamount.toFixed(2);
    document.getElementById("totalamount").value = totalamount.toFixed(2);
};

const exportMaterial = {
    onDateChange: onDateChange,
    updateAmount: updateAmount,
    eleID: eleID,
};

export default exportMaterial;
